import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // First, validate the role and email combination
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: role.toLowerCase()
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Verify that the user type matches the selected role
        if (data.userType.toLowerCase() !== role.toLowerCase()) {
          throw new Error(`This email is registered as a ${data.userType}. Please use the correct login tab.`);
        }

        // Store user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.userType.toLowerCase());
        localStorage.setItem('userData', JSON.stringify({
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        }));

        toast.success(`Welcome back, ${data.firstName}!`);
        
        // Navigate based on role
        switch(data.userType.toLowerCase()) {
          case 'advocate':
            navigate('/dashboards/advocate');
            break;
          case 'client':
            navigate('/dashboards/client');
            break;
          case 'intern':
            navigate('/dashboards/intern');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('registered as')) {
          // Wrong role selected
          toast.error(error.message);
        } else if (error.message === 'Invalid credentials' || error.message.includes('Invalid email or password')) {
          toast.error('Invalid email or password');
          setErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password'
          });
        } else if (error.message === 'User not found') {
          toast.error('No account found with this email');
          setErrors({
            email: 'No account found with this email'
          });
        } else {
          // Generic error
          toast.error('Login failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const renderLoginForm = (role) => (
    <form className="space-y-5 w-full" onSubmit={(e) => handleSubmit(e, role)}>
      <div className="space-y-2">
        <Label htmlFor={`email-${role}`} className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id={`email-${role}`}
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={`h-11 px-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 ${
            errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
          }`}
          disabled={isLoading}
          required
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`password-${role}`} className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id={`password-${role}`}
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className={`h-11 px-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 ${
            errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
          }`}
          disabled={isLoading}
          required
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className={`w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 
          ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-md'}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Logging in...</span>
          </span>
        ) : (
          `Login as ${role}`
        )}
      </Button>

      <div className="text-center text-sm text-gray-500">
        <p>Don't have an account? 
          <button 
            type="button" 
            onClick={() => {
              navigate('/', { state: { initialView: 'userSelection' } });
            }} 
            className="ml-1 text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
          >
            Register here
          </button>
        </p>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border-0">
        <div className="space-y-3 text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-lg">Sign in to your account</p>
        </div>

        <Tabs defaultValue="advocate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-gray-100/80 rounded-xl mb-6">
            <TabsTrigger 
              value="advocate" 
              className="rounded-lg px-4 py-2.5 text-sm font-medium
                data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                text-gray-600 hover:text-gray-900
                transition-all duration-200"
            >
              Advocate
            </TabsTrigger>
            <TabsTrigger 
              value="client"
              className="rounded-lg px-4 py-2.5 text-sm font-medium
                data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                text-gray-600 hover:text-gray-900
                transition-all duration-200"
            >
              Client
            </TabsTrigger>
            <TabsTrigger 
              value="intern"
              className="rounded-lg px-4 py-2.5 text-sm font-medium
                data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                text-gray-600 hover:text-gray-900
                transition-all duration-200"
            >
              Intern
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="advocate" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            {renderLoginForm('Advocate')}
          </TabsContent>
          
          <TabsContent value="client" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            {renderLoginForm('Client')}
          </TabsContent>
          
          <TabsContent value="intern" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            {renderLoginForm('Intern')}
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm mt-6">
          <button 
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-blue-900 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
          >
            Forgot your password?
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login; 
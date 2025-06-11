import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

const RegistrationFlow = ({ userType, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    idType: '',
    idProofFront: null,
    idProofBack: null,
    lawDegree: null,
    studentId: null,
    resume: null,
    barCouncilId: '',
    schoolName: '',
    specialization: '',
    experience: '',
    fees: '',
    bio: '',
    occupation: '',
    companyName: '',
    preferredLanguages: ['English'],
    budget: 0,
    preferredLocation: '',
    caseType: 'civil'
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({
    governmentId: null,
    governmentIdBack: null,
    degreeCertificate: null,
    studentId: null,
    resume: null
  });

  const handleFileChange = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field) => (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should not exceed 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, [field]: file }));
      toast.success('File uploaded successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData object
      const formDataObj = new FormData();
      
      // Add the registration data
      const registrationData = {
        ...formData,
        userType,
        occupation: formData.occupation || 'Not Specified',
        companyName: formData.companyName || '',
        preferredLanguages: formData.preferredLanguages || ['English'],
        budget: formData.budget || 0,
        preferredLocation: formData.preferredLocation || formData.city,
        caseType: formData.caseType || 'civil'
      };

      console.log('Registration data being sent:', registrationData);
      
      formDataObj.append('data', JSON.stringify(registrationData));
      
      // Add files if they exist
      if (formData.idProofFront) {
        formDataObj.append('idProofFront', formData.idProofFront);
      }
      if (formData.idProofBack) {
        formDataObj.append('idProofBack', formData.idProofBack);
      }
      if (formData.lawDegree) {
        formDataObj.append('lawDegree', formData.lawDegree);
      }
      if (formData.studentId) {
        formData.append('studentId', formData.studentId);
      }
      if (formData.resume) {
        formDataObj.append('resume', formData.resume);
      }

      console.log('Files being sent:', {
        idProofFront: formData.idProofFront,
        idProofBack: formData.idProofBack,
        lawDegree: formData.lawDegree,
        studentId: formData.studentId,
        resume: formData.resume
      });

      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      toast.success('Registration successful! Please login to continue.');
      
      // Instead of storing token, redirect to login
      if (onComplete) {
        onComplete(); // This should navigate to login page
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    console.log('Validating step:', currentStep);
    console.log('Current form data:', formData);

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Please enter a valid 6-digit pincode';
      }
    }

    if (currentStep === 3) {
      if (!formData.idType) newErrors.idType = 'Please select an ID type';
      if (!files.governmentId) newErrors.governmentId = 'Government ID is required';
      if (formData.idType === 'aadhaar' && !files.governmentIdBack) {
        newErrors.governmentIdBack = 'Back side of Aadhaar is required';
      }
      if (userType === 'advocate' && !files.degreeCertificate) {
        newErrors.degreeCertificate = 'Law degree certificate is required';
      }
      if (userType === 'intern' && !files.studentId) {
        newErrors.studentId = 'Student ID is required';
      }
    }

    if (currentStep === 4) {
      if (userType === 'advocate') {
        if (!formData.barCouncilId) newErrors.barCouncilId = 'Bar Council ID is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.experience) newErrors.experience = 'Experience is required';
        if (!formData.fees) newErrors.fees = 'Consultation fees is required';
      } else if (userType === 'intern') {
        if (!formData.schoolName) newErrors.schoolName = 'Law school name is required';
        if (!formData.experience) newErrors.experience = 'Current year is required';
        if (!files.resume) newErrors.resume = 'Resume/CV is required';
      }
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === totalSteps) {
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const prevStep = () => setStep(step - 1);

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Personal Information';
      case 2: return 'Address Details';
      case 3: return 'Document Verification';
      case 4: return userType === 'advocate' ? 'Professional Details' : userType === 'intern' ? 'Educational Details' : 'Case Information';
      default: return 'Registration';
    }
  };

  const totalSteps = userType === 'client' ? 3 : 4;

  // Add error display to input fields
  const renderError = (field) => {
    if (errors[field]) {
      return <p className="text-sm text-red-500 mt-1">{errors[field]}</p>;
    }
    return null;
  };

  // Add file upload handler to document upload sections
  const renderFileUpload = (field, label, description) => (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer ${
        errors[field] ? 'border-red-500' : 'border-slate-300'
      }`}
      onClick={() => document.getElementById(field).click()}
    >
      <input
        type="file"
        id={field}
        className="hidden"
        onChange={(e) => handleFileChange(field, e.target.files[0])}
        accept=".jpg,.jpeg,.png,.pdf"
      />
      <Upload className={`h-8 w-8 mx-auto mb-2 ${errors[field] ? 'text-red-500' : 'text-slate-400'}`} />
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
      {files[field] && (
        <p className="text-sm text-green-600 mt-2">
          {files[field].name}
        </p>
      )}
      {renderError(field)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6 flex items-center space-x-2"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Registration
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-sm text-slate-600">Step {step} of {totalSteps}</div>
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>{getStepTitle()}</span>
            </CardTitle>
            <CardDescription>
              All information is encrypted and compliant with Indian data protection laws
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {renderError('firstName')}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {renderError('lastName')}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {renderError('email')}
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className={errors.mobile ? 'border-red-500' : ''}
                  />
                  {renderError('mobile')}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {renderError('address')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {renderError('city')}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleInputChange('state', value)}
                    >
                      <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                    {renderError('state')}
                  </div>
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="Enter 6-digit pincode"
                    className={errors.pincode ? 'border-red-500' : ''}
                  />
                  {renderError('pincode')}
                </div>
              </div>
            )}

            {step === 3 && userType === 'client' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Document & Case Information</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please provide your ID proof and case details to help us match you with the right legal professional.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Government ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      id="idProofFront"
                      className="hidden"
                      onChange={handleFileUpload('idProofFront')}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div 
                      className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('idProofFront').click()}
                    >
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload Government ID (Front) *</p>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG or PDF (Max 5MB)</p>
                      {formData.idProofFront && (
                        <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.idProofFront.name}</p>
                      )}
                    </div>
                  </div>

                  {formData.idType === 'aadhaar' && (
                    <div>
                      <input
                        type="file"
                        id="idProofBack"
                        className="hidden"
                        onChange={handleFileUpload('idProofBack')}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('idProofBack').click()}
                      >
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Upload Aadhaar (Back) *</p>
                        <p className="text-xs text-slate-500 mt-1">Numbers will be masked as per DPDP Act 2023</p>
                        {formData.idProofBack && (
                          <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.idProofBack.name}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Case Details</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="occupation">Occupation *</Label>
                      <Input
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        placeholder="Enter your occupation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="caseType">Type of Case *</Label>
                      <Select 
                        value={formData.caseType} 
                        onValueChange={(value) => handleInputChange('caseType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="criminal">Criminal Law</SelectItem>
                          <SelectItem value="civil">Civil Law</SelectItem>
                          <SelectItem value="corporate">Corporate Law</SelectItem>
                          <SelectItem value="family">Family Law</SelectItem>
                          <SelectItem value="taxation">Taxation</SelectItem>
                          <SelectItem value="property">Property Law</SelectItem>
                          <SelectItem value="labor">Labor Law</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                        placeholder="Enter your budget"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredLocation">Preferred Location</Label>
                      <Input
                        id="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                        placeholder="Enter preferred location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredLanguages">Preferred Languages</Label>
                      <Select 
                        value={formData.preferredLanguages[0]} 
                        onValueChange={(value) => handleInputChange('preferredLanguages', [value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Marathi">Marathi</SelectItem>
                          <SelectItem value="Gujarati">Gujarati</SelectItem>
                          <SelectItem value="Bengali">Bengali</SelectItem>
                          <SelectItem value="Tamil">Tamil</SelectItem>
                          <SelectItem value="Telugu">Telugu</SelectItem>
                          <SelectItem value="Kannada">Kannada</SelectItem>
                          <SelectItem value="Malayalam">Malayalam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (userType === 'advocate' || userType === 'intern') && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Document Verification Required</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        As per Indian legal compliance, all users must verify their identity with government-issued documents.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Government ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      id="idProofFront"
                      className="hidden"
                      onChange={handleFileUpload('idProofFront')}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div 
                      className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('idProofFront').click()}
                    >
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload Government ID (Front) *</p>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG or PDF (Max 5MB)</p>
                      {formData.idProofFront && (
                        <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.idProofFront.name}</p>
                      )}
                    </div>
                  </div>

                  {formData.idType === 'aadhaar' && (
                    <div>
                      <input
                        type="file"
                        id="idProofBack"
                        className="hidden"
                        onChange={handleFileUpload('idProofBack')}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('idProofBack').click()}
                      >
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Upload Aadhaar (Back) *</p>
                        <p className="text-xs text-slate-500 mt-1">Numbers will be masked as per DPDP Act 2023</p>
                        {formData.idProofBack && (
                          <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.idProofBack.name}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {userType === 'advocate' && (
                    <div>
                      <input
                        type="file"
                        id="lawDegree"
                        className="hidden"
                        onChange={handleFileUpload('lawDegree')}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('lawDegree').click()}
                      >
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Upload Law Degree Certificate *</p>
                        <p className="text-xs text-slate-500 mt-1">Required for advocate verification</p>
                        {formData.lawDegree && (
                          <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.lawDegree.name}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {userType === 'intern' && (
                    <div>
                      <input
                        type="file"
                        id="studentId"
                        className="hidden"
                        onChange={handleFileUpload('studentId')}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('studentId').click()}
                      >
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Upload Student ID *</p>
                        <p className="text-xs text-slate-500 mt-1">Current law school identification</p>
                        {formData.studentId && (
                          <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.studentId.name}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && userType === 'advocate' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="barCouncilId">Bar Council ID *</Label>
                  <Input
                    id="barCouncilId"
                    value={formData.barCouncilId}
                    onChange={(e) => handleInputChange('barCouncilId', e.target.value)}
                    placeholder="Enter Bar Council registration number"
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="taxation">Taxation</SelectItem>
                      <SelectItem value="property">Property Law</SelectItem>
                      <SelectItem value="labor">Labor Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Enter years of practice"
                  />
                </div>
                <div>
                  <Label htmlFor="fees">Consultation Fee (₹/hour) *</Label>
                  <Input
                    id="fees"
                    value={formData.fees}
                    onChange={(e) => handleInputChange('fees', e.target.value)}
                    placeholder="Enter your consultation fee"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description of your practice and expertise"
                  />
                </div>
              </div>
            )}

            {step === 4 && userType === 'intern' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="schoolName">Law School/University *</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    placeholder="Enter your law school name"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Current Year of Study *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="5">5th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="taxation">Taxation</SelectItem>
                      <SelectItem value="property">Property Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    onChange={handleFileUpload('resume')}
                    accept=".pdf,.doc,.docx"
                  />
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('resume').click()}
                  >
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Upload Resume/CV</p>
                    <p className="text-xs text-slate-500 mt-1">PDF format preferred</p>
                    {formData.resume && (
                      <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.resume.name}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="ml-auto bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Completing Registration...' : 'Complete Registration'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationFlow; 
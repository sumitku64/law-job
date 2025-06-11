import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Scale, Clock, Star, FileText, Video, MessageSquare } from "lucide-react";
import UserTypeSelection from '@/components/UserTypeSelection';
import ClientDashboard from '@/components/dashboards/ClientDashboard';
import AdvocateDashboard from '@/components/dashboards/AdvocateDashboard';
import InternDashboard from '@/components/dashboards/InternDashboard';
import RegistrationFlow from '@/components/RegistrationFlow';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('landing');
  const [selectedUserType, setSelectedUserType] = useState(null);

  useEffect(() => {
    // Check if we're coming from login page with userSelection view request
    if (location.state?.initialView === 'userSelection') {
      setCurrentView('userSelection');
    }
  }, [location]);

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    setCurrentView('registration');
  };

  const handleRegistrationComplete = () => {
    // Navigate to login page after successful registration
    navigate('/login');
  };

  if (currentView === 'userSelection') {
    return <UserTypeSelection onSelect={handleUserTypeSelect} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'registration') {
    return (
      <RegistrationFlow 
        userType={selectedUserType} 
        onComplete={handleRegistrationComplete}
        onBack={() => setCurrentView('userSelection')}
      />
    );
  }

  if (currentView === 'clientDashboard') {
    return <ClientDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'advocateDashboard') {
    return <AdvocateDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'internDashboard') {
    return <InternDashboard onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Legal Connect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
              <Button onClick={() => setCurrentView('userSelection')}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800">Compliant with Indian Legal Framework</Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Connecting India's Legal Professionals with Those Who Need Them
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Secure, verified, and lawful communication platform for legal consultation and services. 
            Fully compliant with Advocates Act 1961, Bar Council Rules, and Indian data protection laws.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => setCurrentView('userSelection')}
            >
              Start Your Legal Journey
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Legal Connect?</h2>
            <p className="text-xl text-slate-600">Built for India's legal ecosystem with security and compliance at its core</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All advocates verified with Bar Council ID and credentials. Secure identity verification for all users.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-powered system connects clients with the right advocates based on expertise, location, and budget.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Secure Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Encrypted chat, voice, and video calls. Secure document sharing with digital signature support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Easy Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book consultations, manage appointments, and get reminders for all your legal meetings.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Join as a Client, Advocate, or Intern</h2>
            <p className="text-xl text-slate-600">Choose your role and start connecting with India's legal community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Clients</CardTitle>
                <CardDescription>Get expert legal advice for your cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Find verified advocates</li>
                  <li>• Transparent fee structure</li>
                  <li>• Secure consultations</li>
                  <li>• Case document management</li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUserTypeSelect('client')}
                >
                  Register as Client
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Scale className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Advocates</CardTitle>
                <CardDescription>Expand your practice and reach clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Build online presence</li>
                  <li>• Manage client cases</li>
                  <li>• Secure payments</li>
                  <li>• Digital case files</li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUserTypeSelect('advocate')}
                >
                  Register as Advocate
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Star className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Interns</CardTitle>
                <CardDescription>Learn from experienced advocates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Find internship opportunities</li>
                  <li>• Learn from mentors</li>
                  <li>• Build your portfolio</li>
                  <li>• Network with professionals</li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUserTypeSelect('intern')}
                >
                  Register as Intern
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Trust & Security</h2>
            <p className="text-xl text-slate-600">Compliant with Indian legal and data protection framework</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Legal Compliance</h3>
                  <p className="text-slate-600">Fully compliant with Advocates Act 1961, Bar Council Rules, and IT Act 2000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FileText className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Data Protection</h3>
                  <p className="text-slate-600">Adheres to Digital Personal Data Protection Act 2023 with Aadhaar masking</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Video className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Secure Communications</h3>
                  <p className="text-slate-600">End-to-end encrypted messaging, voice, and video calls</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Star className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Verified Professionals</h3>
                  <p className="text-slate-600">Rigorous verification process for all advocates and legal professionals</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Start Your Legal Journey Today</h3>
              <p className="mb-6 opacity-90">Join thousands of clients, advocates, and interns already using Legal Connect</p>
              <Button 
                className="bg-white text-blue-600 hover:bg-slate-100 w-full"
                onClick={() => setCurrentView('userSelection')}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Legal Connect</h3>
              </div>
              <p className="text-slate-400">Bridging the gap between legal professionals and those who need them across India.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Find Advocates</li>
                <li>Book Consultations</li>
                <li>Case Management</li>
                <li>Secure Payments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Advocates</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Expand Practice</li>
                <li>Client Management</li>
                <li>Digital Payments</li>
                <li>Professional Network</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Legal Connect. All rights reserved. Compliant with Indian Legal Framework.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Scale, FileText, ArrowLeft } from "lucide-react";

const UserTypeSelection = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-8 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Role</h1>
          <p className="text-xl text-slate-600">Select how you'd like to use Legal Connect</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <Users className="h-20 w-20 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-2xl">Client</CardTitle>
              <CardDescription className="text-lg">I need legal services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Find verified advocates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Get legal consultations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Transparent pricing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Secure communication</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700" 
                onClick={() => onSelect('client')}
              >
                Continue as Client
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <Scale className="h-20 w-20 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-2xl">Advocate</CardTitle>
              <CardDescription className="text-lg">I provide legal services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <span>Expand your practice</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <span>Connect with clients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <span>Manage appointments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <span>Digital payments</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-green-600 hover:bg-green-700" 
                onClick={() => onSelect('advocate')}
              >
                Continue as Advocate
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <FileText className="h-20 w-20 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-2xl">Intern</CardTitle>
              <CardDescription className="text-lg">I'm learning law</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <span>Find internships</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <span>Connect with advocates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <span>Build your portfolio</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <span>Learn from experts</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700" 
                onClick={() => onSelect('intern')}
              >
                Continue as Intern
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600">
            All registrations require identity verification as per Indian legal compliance requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection; 
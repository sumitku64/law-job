import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageSquare, Calendar, Star, Filter, MapPin, Clock } from "lucide-react";

const ClientDashboard = ({ onBack }) => {
  const advocates = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialization: "Criminal Law",
      experience: 8,
      rating: 4.8,
      fee: 2500,
      location: "Delhi High Court",
      verified: true,
      available: true
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      specialization: "Corporate Law",
      experience: 12,
      rating: 4.9,
      fee: 4000,
      location: "Mumbai",
      verified: true,
      available: false
    },
    {
      id: 3,
      name: "Adv. Sunita Patel",
      specialization: "Family Law",
      experience: 6,
      rating: 4.7,
      fee: 2000,
      location: "Bangalore",
      verified: true,
      available: true
    }
  ];

  const recentCases = [
    {
      id: 1,
      title: "Property Dispute Consultation",
      advocate: "Adv. Priya Sharma",
      status: "Ongoing",
      nextHearing: "2024-06-15"
    },
    {
      id: 2,
      title: "Contract Review",
      advocate: "Adv. Rajesh Kumar",
      status: "Completed",
      nextHearing: null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">Client Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle>Find Legal Experts</CardTitle>
                <CardDescription>Search for advocates based on your legal needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search by specialization, location, or name..."
                      className="w-full"
                    />
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advocates List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Available Advocates</h2>
              {advocates.map((advocate) => (
                <Card key={advocate.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{advocate.name}</h3>
                          {advocate.verified && (
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                          )}
                          {advocate.available ? (
                            <Badge className="bg-blue-100 text-blue-800">Available</Badge>
                          ) : (
                            <Badge variant="secondary">Busy</Badge>
                          )}
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Specialization:</span>
                            <span>{advocate.specialization}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{advocate.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{advocate.experience} years</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{advocate.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Fee:</span>
                            <span className="text-lg font-semibold text-green-600">₹{advocate.fee}/hour</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" disabled={!advocate.available}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" disabled={!advocate.available}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Active Cases</span>
                  <span className="font-semibold text-xl">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Completed Cases</span>
                  <span className="font-semibold text-xl">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Saved Advocates</span>
                  <span className="font-semibold text-xl">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCases.map((case_) => (
                  <div key={case_.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-slate-900">{case_.title}</h4>
                    <p className="text-sm text-slate-600">{case_.advocate}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={case_.status === 'Ongoing' ? 'default' : 'secondary'}>
                        {case_.status}
                      </Badge>
                      {case_.nextHearing && (
                        <span className="text-xs text-slate-500">
                          Next: {case_.nextHearing}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Upload Documents
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Consultation
                </Button>
                <Button className="w-full" variant="outline">
                  View Payment History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 
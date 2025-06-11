import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Users, Trophy, Clock, Star, FileText, MapPin } from "lucide-react";

const InternDashboard = ({ onBack }) => {
  const internshipOpportunities = [
    {
      id: 1,
      firm: "Sharma & Associates",
      advocate: "Adv. Priya Sharma",
      type: "Criminal Law",
      duration: "3 months",
      location: "Delhi",
      stipend: "₹15,000/month",
      status: "open"
    },
    {
      id: 2,
      firm: "Corporate Legal Solutions",
      advocate: "Adv. Rajesh Kumar",
      type: "Corporate Law",
      duration: "6 months",
      location: "Mumbai",
      stipend: "₹20,000/month",
      status: "applied"
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: "Introduction to Indian Constitution",
      progress: 85,
      duration: "4 hours",
      completed: false
    },
    {
      id: 2,
      title: "Criminal Procedure Code",
      progress: 100,
      duration: "6 hours",
      completed: true
    },
    {
      id: 3,
      title: "Contract Law Fundamentals",
      progress: 45,
      duration: "5 hours",
      completed: false
    }
  ];

  const mentorSessions = [
    {
      id: 1,
      mentor: "Adv. Sunita Patel",
      topic: "Legal Research Techniques",
      date: "Today, 3:00 PM",
      type: "Video Call"
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
            <h1 className="text-2xl font-bold text-slate-900">Intern Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Portfolio
              </Button>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Applications</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <FileText className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Learning Hours</p>
                  <p className="text-3xl font-bold">45</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Mentor Sessions</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Achievements</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Internship Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Internship Opportunities</CardTitle>
                <CardDescription>Find the perfect internship to boost your legal career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {internshipOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{opportunity.firm}</h4>
                          <p className="text-sm text-slate-600">{opportunity.advocate}</p>
                        </div>
                        <Badge variant={opportunity.status === 'open' ? 'default' : 'secondary'}>
                          {opportunity.status === 'open' ? 'Open' : 'Applied'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{opportunity.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className="font-medium text-green-600">
                          {opportunity.stipend}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {opportunity.status === 'open' ? (
                          <Button size="sm">Apply Now</Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>Applied</Button>
                        )}
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Modules</CardTitle>
                <CardDescription>Continue your legal education journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningModules.map((module) => (
                    <div key={module.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{module.title}</h4>
                          <p className="text-sm text-slate-600">Duration: {module.duration}</p>
                        </div>
                        {module.completed && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant={module.completed ? "outline" : "default"}>
                          {module.completed ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {mentorSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-slate-900">{session.topic}</h4>
                    <p className="text-sm text-slate-600">with {session.mentor}</p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-slate-500">{session.date}</span>
                      <Badge variant="outline">{session.type}</Badge>
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
                  Update Portfolio
                </Button>
                <Button className="w-full" variant="outline">
                  Book Mentor Session
                </Button>
                <Button className="w-full" variant="outline">
                  View Certificates
                </Button>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Courses Completed</span>
                  <span className="font-semibold text-xl">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Certificates Earned</span>
                  <span className="font-semibold text-xl">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Hours Spent</span>
                  <span className="font-semibold text-xl">45</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboard; 
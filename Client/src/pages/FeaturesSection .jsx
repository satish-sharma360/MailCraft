import React from 'react'
import Card from '../Component/Card ';
import { BarChart3, Mail, Send, Target, TrendingUp, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Mail,
      title: "Drag & Drop Editor",
      description: "Build beautiful emails with our intuitive visual editor. No coding required."
    },
    {
      icon: Users,
      title: "Contact Management",
      description: "Organize contacts, create segments, and import from CSV files effortlessly."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track opens, clicks, and conversions with detailed reporting and insights."
    },
    {
      icon: Send,
      title: "Bulk Email Sending",
      description: "Send thousands of emails at once with our reliable delivery system."
    },
    {
      icon: Target,
      title: "Smart Targeting",
      description: "Target the right audience with advanced segmentation and personalization."
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor campaign performance and optimize for better results."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="block text-blue-600">Email Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, send, and track successful email campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection 

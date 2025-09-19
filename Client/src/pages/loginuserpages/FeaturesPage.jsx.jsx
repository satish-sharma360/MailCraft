// src/pages/FeaturesPage.jsx
import React from 'react';
import {
  Mail,
  Users,
  BarChart3,
  Send,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar ';

const features = [
  {
    icon: Mail,
    title: "Drag & Drop Editor",
    description: "Build beautiful emails with our intuitive visual editor. No coding required.",
    path: "/editor",
  },
  {
    icon: Users,
    title: "Contact Management",
    description: "Organize contacts, create segments, and import from CSV files effortlessly.",
    path: "/contacts",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track opens, clicks, and conversions with detailed reporting and insights.",
    path: "/analytics",
  },
  {
    icon: Send,
    title: "Bulk Email Sending",
    description: "Send thousands of emails at once with our reliable delivery system.",
    path: "/send-email",
  },
  {
    icon: Target,
    title: "Smart Targeting",
    description: "Target the right audience with advanced segmentation and personalization.",
    path: "/targeting",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor campaign performance and optimize for better results.",
    path: "/performance",
  },
];

const FeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <Navbar/>
      <div className="max-w-7xl mt-6 mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Dashboard Features
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, path }, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
              <p className="text-sm text-gray-600 mb-4">{description}</p>
              <button
                onClick={() => navigate(path)}
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Go to {title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeaturesPage;

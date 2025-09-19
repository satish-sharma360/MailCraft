import { ArrowRight, Play, Star, Zap } from 'lucide-react';
import React from 'react'
import Button from '../Component/Button ';

const HeroSection = () => (
  <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
          <Zap className="h-4 w-4 mr-2" />
          Build Beautiful Email Campaigns in Minutes
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Email Marketing
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Create stunning email campaigns with our drag-and-drop editor. Send bulk emails, 
          track performance, and grow your business with powerful email marketing tools.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button variant="primary" size="lg" icon={ArrowRight}>
            Start Free Trial
          </Button>
          <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mr-3">
              <Play className="h-5 w-5 text-blue-600 ml-1" />
            </div>
            Watch Demo
          </button>
        </div>
        
        <div className="mt-16 flex justify-center items-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>4.9/5 Rating</span>
          </div>
          <div>10,000+ Happy Users</div>
          <div>99.9% Uptime</div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection 

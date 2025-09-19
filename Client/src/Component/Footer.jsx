import { Globe, Mail, Shield } from 'lucide-react';
import React from 'react'
import Logo from './Logo ';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Logo className="h-10 w-10 mb-4" textSize="text-xl" />
          <p className="text-gray-400 mb-4">
            The most powerful email marketing platform for modern businesses.
          </p>
          <div className="flex space-x-4">
            <Shield className="h-5 w-5 text-gray-400" />
            <Globe className="h-5 w-5 text-gray-400" />
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Templates</a></li>
            <li><a href="#" className="hover:text-white">Analytics</a></li>
            <li><a href="#" className="hover:text-white">Integrations</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">API Docs</a></li>
            <li><a href="#" className="hover:text-white">Status</a></li>
            <li><a href="#" className="hover:text-white">Privacy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © 2024 MailCraft. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer

import { Mail } from 'lucide-react';
import React from 'react'

const Logo = ({ className = "h-8 w-8", textSize = "text-2xl" }) => (
  <div className="flex items-center space-x-2">
    <div className={`${className} bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center`}>
      <Mail className="h-5 w-5 text-white" />
    </div>
    <span className={`${textSize} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
      MailCraft
    </span>
  </div>
);

export default Logo 

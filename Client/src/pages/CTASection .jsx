import React from "react";
import Button from "../Component/Button ";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection  = () => {
    const navigate = useNavigate()
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Transform Your Email Marketing?
      </h2>
      <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
        Join thousands of businesses who trust MailCraft for their email
        campaigns. Start your free trial today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Button onClick={() => navigate('/auth')} variant="secondary" size="lg" icon={ArrowRight}>
          Start Free Trial
        </Button>
        <a
          href="#contact"
          className="text-white hover:text-blue-200 transition-colors duration-200"
        >
          Talk to Sales
        </a>
      </div>
    </div>
  </section>
  )
}

export default CTASection;

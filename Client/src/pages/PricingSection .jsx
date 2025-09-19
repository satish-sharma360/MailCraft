import React from 'react'
import Button from '../Component/Button ';
import { Check } from 'lucide-react';
import Card from '../Component/Card ';
import { useNavigate } from 'react-router-dom';

const PricingSection  = () => {
    const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: ["1,000 emails/month", "Basic templates", "Email support", "Basic analytics"],
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      description: "Best for growing businesses",
      features: ["25,000 emails/month", "Advanced templates", "Priority support", "Advanced analytics", "A/B testing"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations",
      features: ["Unlimited emails", "Custom templates", "24/7 phone support", "Custom integrations", "Dedicated manager"],
      popular: false
    }
  ];

  const navigate = useNavigate()
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-8 text-center relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {plan.price}
                {plan.price !== "Free" && <span className="text-lg text-gray-600">/month</span>}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => navigate('/auth')}
                variant={plan.popular ? "primary" : "secondary"} 
                className="w-full"
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection 

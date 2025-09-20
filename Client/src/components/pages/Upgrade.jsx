const Upgrade = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Your Plan</h1>
      <p className="text-gray-600">Choose a plan that fits your email marketing needs.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          name: 'Free',
          price: '$0',
          period: '/month',
          features: ['1,000 emails/month', '500 contacts', 'Basic templates', 'Email support'],
          current: true
        },
        {
          name: 'Pro',
          price: '$29',
          period: '/month',
          features: ['10,000 emails/month', '5,000 contacts', 'Advanced templates', 'Priority support', 'Analytics'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$99',
          period: '/month',
          features: ['Unlimited emails', 'Unlimited contacts', 'Custom templates', '24/7 support', 'Advanced analytics', 'API access']
        }
      ].map((plan, index) => (
        <div key={index} className={`relative bg-white p-6 rounded-lg border-2 ${
          plan.popular ? 'border-blue-500' : 'border-gray-200'
        } ${plan.current ? 'opacity-75' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-600">{plan.period}</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              plan.current 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
            disabled={plan.current}
          >
            {plan.current ? 'Current Plan' : 'Upgrade Now'}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Upgrade

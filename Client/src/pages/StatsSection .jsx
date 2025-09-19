import React from "react";

const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "5M+", label: "Emails Sent" },
    { number: "99.9%", label: "Delivery Rate" },
    { number: "4.9★", label: "User Rating" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import React from "react";
import Navbar from "./Navbar";
import Leandingimg from "../../assets/landing.png";

const Leanding = () => {
  return (
    <div className="w-full h-full bg-[#ffffff]">
      <Navbar />
      <section className="w-11/12 flex items-center justify-center gap-6 flex-col mx-auto">
        <h1 className="text-[3vw] font-bold mt-6 ">
          Craft Stunning <span className="text-blue-500">Email Templates</span>{" "}
          in Minutes
        </h1>
        <h4 className="text-xl font-medium">
          Professional • Responsive • Conversion-Focused
        </h4>
        <p className="w-[80%] text-center text-lg font-normal">
          Transform your email marketing with MailCraft's intuitive
          drag-and-drop editor. Create beautiful, responsive email templates
          that engage your audience and drive results—no coding skills required.
          From newsletters to promotional campaigns, bring your vision to life
          with professional designs that work across all devices and email
          clients.
        </p>
        <button className="px-6 py-2.5 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95">
          Start Creating free
        </button>
        <img className="rounded-2xl" src={Leandingimg} alt="" />
      </section>
      <section className="w-11/12 flex items-center justify-between mx-auto">
        <div className="p-4">
          <p className="text-[2vw] text-center font-semibold mb-2 mt-8">Create Beautiful, Responsive Emails</p>
          <p className="text-[2vw] text-center text-blue-500 font-semibold mb-2">Right From Your Browser</p>
          {/* <div className="flex items-center justify-between gap-10">
            <Card
              title="Create Stunning Emails Instantly — No Sign-Up Required"
              subtitle="Start designing professional emails in seconds with our free drag-and-drop email builder. No registration, no hassle — just powerful, user-friendly email creation."
              href="#"
            />
            <Card
              title="Step 1: Design with Easy Drag-and-Drop Tools"
              subtitle="Build responsive email templates using our intuitive drag-and-drop editor. Perfect for devices like desktop and tablet."
              href="#"
            />
            <Card
              title="Step 2: Copy Clean, Ready-to-Send Code"
              subtitle="Generate optimized HTML email code with inline CSS. Copy and paste directly into Mailchimp, Gmail, HubSpot, or any major email platform."
              href="#"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Leanding;

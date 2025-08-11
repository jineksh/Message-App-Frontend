import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#5c3b58] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Decorative Blurs */}
      {/* <div className="absolute top-10 left-10 w-40 h-40 bg-fuchsia-500 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-400 rounded-full blur-3xl opacity-30" /> */}

      {/* Content */}
      <div className="max-w-3xl text-center relative z-10">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Where teamwork happens.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Chat, collaborate, and get work done faster with your team — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-white text-fuchsia-800 hover:bg-gray-200 font-semibold px-6 py-3"
            onClick={() => navigate("/auth/signup")}
          >
            Get Started
          </Button>
          <Button
            className="border border-white bg-transparent text-white hover:bg-white hover:text-fuchsia-800 font-semibold px-6 py-3"
            onClick={() => navigate("/auth/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

"use client"
import React from "react";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* Left Image Section - Equal width on desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
        <img
          src="https://joinsuperset.com/blogs/wp-content/uploads/2023/07/Online-Interview.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-indigo-700/50 to-indigo-500/30"></div>
        {/* Motivational Text */}
        <motion.div
          className="absolute bottom-8 left-8 text-white max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold drop-shadow-lg">
            Ace Your Interviews 🚀
          </h2>
          <p className="mt-3 text-lg opacity-90 leading-relaxed">
            Sign in to access your dashboard, track progress, and prepare for success.
          </p>
        </motion.div>
      </div>

      {/* Right Auth Form Section - Equal width on desktop */}
      <motion.div
        className="flex-1 lg:w-1/2 flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8 py-4 lg:py-0 overflow-y-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto py-4">
          {/* Mobile Header Image - Only visible on small screens */}
          <div className="lg:hidden mb-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🚀</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              AI Interview Mocker
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Your success starts here
            </p>
          </div>

          {/* Title */}
          <div className="text-center lg:text-left mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-2xl font-extrabold text-gray-900 flex items-center justify-center lg:justify-start gap-2 leading-tight">
              Welcome To AI Interview Mocker
              <span className="inline-block animate-bounce"></span>
            </h1>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">
              Log in to continue your journey
            </p>
          </div>

          {/* Clerk Sign In Component */}
          <div className="w-full">
            <SignIn
              appearance={{
                elements: {
                  // Main card styling
                  card: "shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 w-full max-w-full",
                  
                  // Header styling
                  headerTitle: "text-lg font-bold text-gray-900 text-center mb-2",
                  headerSubtitle: "text-gray-600 text-center mb-4 text-sm",
                  
                  // Social buttons (Google, GitHub, etc.)
                  socialButtonsBlockButton: 
                    "w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-700 mb-2 bg-white",
                  socialButtonsBlockButtonText: "text-sm font-medium text-gray-700",
                  socialButtonsBlockButtonArrow: "hidden",
                  
                  // Form elements
                  formFieldInput: 
                    "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-sm",
                  formFieldLabel: "block text-sm font-medium text-gray-700 mb-1",
                  
                  // Primary button (Sign In)
                  formButtonPrimary:
                    "w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md transition-all duration-200 rounded-lg px-4 py-2.5 mt-3",
                  
                  // Links and secondary elements
                  footerActionLink: "text-indigo-600 font-semibold hover:text-indigo-800 transition-colors",
                  identityPreviewEditButton: "text-indigo-600 hover:text-indigo-800",
                  formResendCodeLink: "text-indigo-600 hover:text-indigo-800",
                  
                  // Divider between social and form
                  dividerLine: "bg-gray-300",
                  dividerText: "text-gray-500 text-sm px-3",
                  
                  // OTP and verification
                  otpCodeFieldInput: "border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center",
                  
                  // Footer
                  footerActionText: "text-gray-600 text-sm",
                  
                  // Error messages
                  formFieldError: "text-red-600 text-sm mt-1",
                  
                  // Loading states
                  spinner: "border-indigo-600",
                },
                layout: {
                  // Put social buttons at the top
                  socialButtonsPlacement: "top",
                  // Show optional fields like "Remember me"
                  showOptionalFields: true,
                },
                variables: {
                  colorPrimary: "#4f46e5", // Indigo color to match your theme
                  colorDanger: "#dc2626",
                  colorSuccess: "#16a34a",
                  colorWarning: "#d97706",
                  colorNeutral: "#64748b",
                  fontFamily: "inherit",
                  borderRadius: "0.5rem",
                }
              }}
              redirectUrl="/dashboard"
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
            />
          </div>

          {/* Terms and Privacy */}
          <p className="mt-4 text-center text-xs text-gray-500 px-4">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-indigo-600 hover:underline font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
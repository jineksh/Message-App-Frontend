import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useNavigate } from 'react-router-dom';

//  Import icons for better user feedback
import { AiOutlineCheckCircle, AiOutlineWarning, AiOutlineLoading3Quarters } from 'react-icons/ai';

/**
 * SignInCard Component
 * - Displays sign-in form
 * - Shows loading, success, and error states
 * - Navigates to sign-up page if user doesn't have an account
 */
const SignInCard = ({ formData, setFormData, signInFuntion, isPending, isSuccess, isError }) => {
  const navigate = useNavigate();

  /**
   * Handles input changes and updates parent state
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Card wrapper */}
      <Card className="shadow-lg border border-gray-200">
        
        {/* Card header section */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-500">
            Access your account by signing in
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Status messages */}
          {isPending && (
            <div className="flex items-center text-blue-600 text-sm mb-2 animate-pulse">
              <AiOutlineLoading3Quarters className="mr-2 animate-spin" size={18} />
              Signing you in...
            </div>
          )}
          {isSuccess && (
            <div className="flex items-center text-green-600 text-sm mb-2">
              <AiOutlineCheckCircle className="mr-2" size={18} />
              Welcome back! Redirecting...
            </div>
          )}
          {isError && (
            <div className="flex items-center text-red-600 text-sm mb-2">
              <AiOutlineWarning className="mr-2" size={18} />
              Invalid email or password. Try again.
            </div>
          )}

          {/* Sign-in form */}
          <form className="space-y-6" onSubmit={signInFuntion}>
            {/* Email Input */}
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            
            {/* Password Input */}
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#5c3b58] hover:bg-fuchsia-900 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isPending} // Disable while signing in
            >
              {isPending ? 'Please wait...' : 'Sign in'}
            </Button>
          </form>

          {/* Separator */}
          <div className="my-6">
            <Separator />
          </div>

          {/* Sign-up navigation */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/auth/signup')}
            >
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInCard;

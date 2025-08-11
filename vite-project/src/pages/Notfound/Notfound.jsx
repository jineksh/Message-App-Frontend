import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <Card className="shadow-lg border border-gray-200 text-center max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-gray-800">404</CardTitle>
          <CardDescription className="text-lg text-gray-500">
            Oops! The page you are looking for doesn’t exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">
            It might have been moved or deleted. Check the URL or go back to the home page.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white px-6"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

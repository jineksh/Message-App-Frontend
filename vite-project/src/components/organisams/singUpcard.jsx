import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useNavigate } from 'react-router-dom';

const SingUpCard = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confrimpassword: ""
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <Card className="shadow-lg border border-gray-200">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Sign up to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                        {/* Email */}
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        {/* Password */}
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                        <Input
                            type="password"
                            name="password"
                            value={formData.confrimpassword}
                            onChange={handleChange}
                            placeholder="confirm password"
                            required
                        />

                        {/* Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#5c3b58] hover:bg-fuchsia-900 text-white"
                        >
                            Sign Up
                        </Button>
                    </form>

                    {/* Separator */}
                    <div className="my-6">
                        <Separator />
                    </div>

                    {/* Paragraph with link */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <span
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => navigate('/auth/signin')}
                        >
                            Sign in
                        </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default SingUpCard;

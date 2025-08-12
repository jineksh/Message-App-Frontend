import React, { useEffect, useState } from 'react';
import SignUpCard from './SingUpCard.jsx'; // relative path sahi lagao
import { useSignUp } from '../../hooks/auth/singUp.jsx';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = () => {
    // ✅ useState hook yaha top-level pe call ho raha hai (React rule: hooks ko top pe call karo)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // ✅ Custom hook bhi top-level pe call ho raha hai
    const { isPending, isSuccess, isError, signUpMutation } = useSignUp();

    // ✅ useNavigate hook bhi top-level pe call ho raha hai
    const navigate = useNavigate();

    // ✅ useEffect hook bhi top-level pe call ho raha hai
    // Reason: Agar ise kisi function ke andar daaloge (jaise SignUpFunction ke andar),
    // to hook call ka order har render me change ho jayega → React error throw karega.
    useEffect(() => {
        if (isSuccess) {
            console.log("Sign up successful");
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        }
    }, [isSuccess, navigate]);

    // ❌ Hooks yaha andar nahi rakh sakte, isliye useEffect ko yaha se hata diya
    async function SignUpFunction(e) {
        e.preventDefault();
        console.log("Form submitted:", formData);

        // Simple validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // ✅ API call
        await signUpMutation({
            email: formData.email,
            password: formData.password,
            name: formData.name,
        });
    }

    return (
        <SignUpCard
            formData={formData}
            setFormData={setFormData}
            SignUpFunction={SignUpFunction}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
        />
    );
};

export default SignUpContainer;

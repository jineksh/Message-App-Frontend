import React, { useEffect, useState } from 'react';
import SignInCard from './SignInCard';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@/hooks/auth/Signin';


const SignInContainer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { isPending, isSuccess, isError, signInMutation } = useSignIn();


    useEffect(() => {
        if (isSuccess) {
            // Token set karo signin success ke baad
            setTimeout(()=>{
                navigate('/workspace');
            },1000);
        }
    }, [isSuccess, navigate]);

    

    async function signInFuntion(e) {
        e.preventDefault();

        console.log('Form Data', formData);

        await signInMutation({
            email: formData.email,
            password: formData.password,
        });
    }



    return (<SignInCard
        formData={formData}
        setFormData={setFormData}
        signInFuntion={signInFuntion}
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
    ></SignInCard>)
}

export default SignInContainer;
import axiosInstance from "@/config/axios";

export const singUp = async ({email,password,username})=>{
    try {
        const response = await axiosInstance.post('/users/singup',{
            email,
            password,
            username
        });
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.response.data;
    }
}

export const singIn = async ({email,password})=>{
    try {
        const response = await axiosInstance.post('/users/login',{
            email,
            password
        });
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.response.data;
    }
}
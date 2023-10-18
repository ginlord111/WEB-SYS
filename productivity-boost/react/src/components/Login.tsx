import { Button } from "./ui/button";
import AuthModal from "./AuthModal";
import { modalController } from "@/hooks/modalController";
import { axiosClient } from "../axios/axios.client";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
interface User {
    email: string;
    password: string;
}
const Login = () => {
    const [_, setCookies] = useCookies();
    const navigate = useNavigate();
    const [message, setMessage] = useState([])
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<AxiosError | any>([]);
   
    const csrf = () => axiosClient.get("/sanctum/csrf-cookie");
const modal = modalController()
const onChange = () => {
    if (modal.isOpenLogin) {
        modal.onClose();
    }
};
const handleClick = () =>{
    modal.onClose()
    modal.onOpenRegister()
}
const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) =>{
    const {  email, password } = user;
    e.preventDefault();
    await csrf();
    try {
        const response = await axiosClient.post("/login", {
            email: email,
            password: password,
        });
        console.log(response)
        setMessage(response.data.message);
        if(response.data.token){
            window.localStorage.setItem("access_token", response.data.token);
            setMessage([])
            setCookies("access_token", response.data.token);
            navigate('/dashboard')
            modal.onClose()
        }
 }

 catch (error: any) {
    if (error.response.status === 422) {
        setErrors(error.response.data.errors);
    }
    console.log(error);
 } 
}

    return (
        <AuthModal title="Sign In" tag="Please login to your account" open={modal.isOpenLogin} onOpenChange={onChange}>
            <form className="flex flex-col items-center justify-center gap-[10px]" onSubmit={handleSubmit} >
            <label className="float-left w-full text-black">Email</label>
                <input
                    type="email"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                {errors.email && (
                    <div>
                        <span className="text-red-400 text-sm m-2 p-2">
                            {errors.email[0]}
                        </span>
                    </div>
                )}
                  <label className="float-left w-full text-black">Password</label>
                <input
                    type="password"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
                {errors.password && (
                    <div>
                        <span className="text-red-400 text-sm m-2 p-2 whitespace-nowrap w-full">
                            {errors.password[0]}
                        </span>
                    </div>
                )}
                <p className="w-full float-left text-[13px] cursor-pointer hover:underline" onClick={handleClick}>New to Ask All? <span className="text-blue-400">Sign Up</span></p>
                {message && (<div> <span className="float-left text-red-400 text-sm whitespace-nowrap w-full">{message}</span></div>)}
                <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                    Sign In
                </Button>
                <div className="flex flex-col justify-center items-center">
                            <p>or</p>
                            <div>
                              
                                <GoogleLogin
                                    width={300}
                                    onSuccess={(credentialResponse) => {
                                        const credentialDecoded: any =
                                            jwt_decode(
                                                credentialResponse.credential!
                                            );
                                        const {
                                            email,
                                            jti
                                        } = credentialDecoded;
                                     const sendEmail = async() =>{
                                        
                                        try {
                                            const response = await axiosClient.post("/login", {
                                                email: email,
                                                password: jti,
                                            });
                                            console.log(response)
                                            setMessage(response.data.message);
                                            if(response.data.token){
                                                window.localStorage.setItem("access_token", response.data.token);
                                                setMessage([])
                                                setCookies("access_token", response.data.token);
                                                navigate('/dashboard')
                                                modal.onClose()
                                            }
                                     }
                                    
                                     catch (error: any) {
                                        if (error.response.status === 422) {
                                            setErrors(error.response.data.errors);
                                        }
                                        console.log(error);
                                     } 
                                     }
                                     sendEmail()
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                />
                                ; 
                            </div>
                        </div>
            </form>
        </AuthModal>
    );
};
export default Login;

import React, { useRef } from "react";
import { Button } from "./ui/button";
import AuthModal from "./AuthModal";
import { modalController } from "@/hooks/modalController";
import { axiosClient } from "../axios/axios.client";
import { useState } from "react";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
interface User {
    email: string;
    password: string;
}
const Login = () => {
   const showPassword = useRef<HTMLInputElement>(null); 
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [_, setCookies] = useCookies();
    const navigate = useNavigate();
    const [message, setMessage] = useState<AxiosError>();
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });
    const [__, setErrors] = useState<AxiosError | any>([]);

    const csrf = () => axiosClient.get("/sanctum/csrf-cookie");
    const modal = modalController();
    const onChange = () => {
        if (modal.isOpenLogin) {
            modal.onClose();
            if (showPassword.current) {
                showPassword.current.type = 'password';
              }
              setIsPasswordVisible(false)
        }
    };
    const handleClick = () => {
        modal.onClose();
        modal.onOpenRegister();
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = user;
        e.preventDefault();
        await csrf();
        try {
            const response = await axiosClient.post("/login", {
                email: email,
                password: password,
            });
            if (response.data.token) {
                window.localStorage.setItem(
                    "access_token",
                    response.data.token
                );

                setCookies("access_token", response.data.token);
                navigate("/dashboard");
                modal.onClose();
            }
               toast.error(response.data?.message);
            console.log(response);
            setIsPasswordVisible(false);
            if (showPassword.current) {
                showPassword.current.type = 'password';
              }
          setUser({
        email: "",
        password: "",
          })
        } catch (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            console.log(error);
        }
        //  {message &&  toast.error(message?)}
    };

    const handleForgot = () => {
        modal.onClose();
        modal.onOpenForgot();
    };
    return (
        <AuthModal
            title="Sign In"
            tag="Please login to your account"
            open={modal.isOpenLogin}
            onOpenChange={onChange}
        >
            <form
                className="flex flex-col items-center justify-center gap-[10px]"
                onSubmit={handleSubmit}
            >
                <label className="float-left w-full text-black">Email</label>
                <input
                    required
                    type="email"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                {/* {errors.email && (
                    toast.error(errors.email[0])
                )} */}
                <label className="float-left w-full text-black">Password</label>
                <div className="flex w-full items-center justify-between">
                    <input
                        required
                        type="password"
                        className="bg-gray-300/40 w-full p-1 rounded-md"
                        value={user?.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        ref={showPassword}
                    />
                    <div className="relative">
                        {!isPasswordVisible ?
                        <AiFillEyeInvisible
                            size={20}
                            className="absolute right-2 top-[-10px]"
                            onClick={() => {
                                if (showPassword.current) {
                                  showPassword.current.type = showPassword.current.type === 'text' ? 'password' : 'text';
                                }
                                setIsPasswordVisible(true);
                              }}
                        />
                    : <AiFillEye
                    size={20}
                    className="absolute right-2 top-[-10px]"
                    onClick={() => {
                        if (showPassword.current) {
                          showPassword.current.type = showPassword.current.type === 'text' ? 'password' : 'text';
                        }
                        setIsPasswordVisible(false);
                      }}
                />
                    }
                    </div>
                </div>
                <span
                    className="text-sm text-blue-400 text-right w-full cursor-pointer"
                    onClick={handleForgot}
                >
                    Forgot Password
                </span>
                {/* {errors.password && (
                 toast.error (errors.password[0])
                )} */}
                <p
                    className="w-full float-left text-[13px] cursor-pointer hover:underline"
                    onClick={handleClick}
                >
                    New to Ask All?{" "}
                    <span className="text-blue-400">Sign Up</span>
                </p>
                <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                    Sign In
                </Button>
                <div className="flex flex-col justify-center items-center">
                    <p>or</p>
                    <div>
                        <GoogleLogin
                            width={300}
                            onSuccess={(credentialResponse) => {
                                const credentialDecoded: any = jwt_decode(
                                    credentialResponse.credential!
                                );
                                const { email } = credentialDecoded;
                                const sendEmail = async () => {
                                    await csrf();
                                    try {
                                        const response = await axiosClient.post(
                                            "/login",
                                            {
                                                email: email,
                                                password: email,
                                            }
                                        );
                                        console.log(response);
                                        toast.error(response.data?.message);
                                        if (response.data.token) {
                                            window.localStorage.setItem(
                                                "access_token",
                                                response.data.token
                                            );
                                            setCookies(
                                                "access_token",
                                                response.data.token
                                            );
                                            navigate("/dashboard");
                                            modal.onClose();
                                        }
                                    } catch (error: any) {
                                        if (error.response.status === 422) {
                                            setErrors(
                                                error.response.data.errors
                                            );
                                        }
                                        console.log(error);
                                    }
                                };
                                sendEmail();
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

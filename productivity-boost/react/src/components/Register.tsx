import { useState,useRef } from "react";
import AuthModal from "./AuthModal";
import { Button } from "./ui/button";
import { modalController } from "@/hooks/modalController";
import { axiosClient } from "../axios/axios.client";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
 import { useCookies } from "react-cookie";
import { User } from "@/types/types";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
const Register = () => {
     const showPassword = useRef<HTMLInputElement>(null); 
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [errorEmail, setErrorsEmail] = useState<any>()
    const [_, setCookies] = useCookies(["access_token"]);
    const [errors, setErrors] = useState<AxiosError | any>([]);
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });
    const { isOpenRegister, onCloseRegister } = modalController();
    const onChange = () => {
        if (isOpenRegister) {
            onCloseRegister();
            if (showPassword.current) {
                showPassword.current.type = 'password';
              }
              setIsPasswordVisible(false)
        }
    };
    const csrf = () => axiosClient.get("/sanctum/csrf-cookie");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { fname, lname, email, password } = user

        await csrf();
        try {
            const response = await axiosClient.post("/register", {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
            });
            window.localStorage.setItem("access_token", response.data.token);
            setCookies("access_token", response.data.token);
            onCloseRegister();
            setUser({ fname: "", lname: "", email: "", password: "" });
            setErrors('');
            navigate("/dashboard");
            setIsPasswordVisible(false)
            if (showPassword.current) {
                showPassword.current.type = 'password';
              }
            console.log(response.data);
            // toast = succesful register
        } catch (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            console.log(error);
        }
    };
    return (
        <AuthModal
            title="Sign Up"
            tag="Register your account"
            open={isOpenRegister}
            onOpenChange={onChange}
        >
            {errorEmail?.email && (<div>
                <span className="text-red-400 text-sm m-2 p-2 mb-2 whitespace-nowrap  text-left">
                            {errorEmail.email[0]}
                        </span>
            </div>)}
            <form
                className="flex flex-col items-center justify-center gap-[10px]"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <label className="float-left w-full text-black">
                    First Name
                </label>
                <input
                required
                    type="text"
                    className="focus:border-transparent bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.fname}
                    onChange={(e) =>
                        setUser({ ...user, fname: e.target.value })
                    }
                />
                <label className="float-left w-full text-black">
                    Last Name
                </label>
                <input
                required
                    type="text"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.lname}
                    onChange={(e) =>
                        setUser({ ...user, lname: e.target.value })
                    }
                />
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
                {errors.email && (
                    <div>
                        <span className="text-red-400 text-sm m-2 p-2">
                            {errors.email[0]}
                        </span>
                    </div>
                )}
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
                {errors.password && (
                    <div>
                        <span className="text-red-400 text-sm m-2 p-2 whitespace-nowrap w-full">
                            {errors.password[0]}
                        </span>
                    </div>
                )}
                {/* <label className="float-left w-full text-black">Confirm Password</label>

                <input
                    type="password"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    title='Password dont match'
                   
                /> 
                 {errors.password && (
                    <div>
                        <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
                    </div>
                )} */}
                     

                <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                    Sign Up
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
                                            given_name,
                                            family_name,
                                            email,
                                        } = credentialDecoded;
                                     const sendEmail = async() =>{
                                        
                                        try {
                                            const response = await axiosClient.post("/register", {
                                                fname: given_name,
                                                lname: family_name,
                                                email: email,
                                                password: email,
                                            });
                                          
                                            window.localStorage.setItem("access_token", response.data.token);
                                            setCookies("access_token", response.data.token);
                                            onCloseRegister();
                                            setErrors('');
                                            navigate("/dashboard");
                                            console.log(response.data);
                                            // toast = succesful register
                                        } catch (error: any) {
                                            if (error.response.status === 422) {
                                                setErrorsEmail(error.response.data.errors);
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

export default Register;

import React, { useState, useRef } from 'react'
import AuthModal from './AuthModal'
import { modalController } from '@/hooks/modalController'
import { Button } from './ui/button';
import { axiosClient } from '@/axios/axios.client';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { AxiosError } from "axios";
interface AdminUser {
    email:string;
    password:string
}
const AdminModal = () => {
    const showPassword = useRef<HTMLInputElement>(null); 
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const {isOpenAdmin, onCloseAdmin, onOpenRegister} = modalController()
    const [__, setErrors] = useState<AxiosError | any>([]);
    const csrf = () => axiosClient.get("/sanctum/csrf-cookie");
       const [_, setCookies] = useCookies();
    const navigate = useNavigate();
    const onChange = () => {
        if (isOpenAdmin) {
            onCloseAdmin(); 
        }
    };
        const [user, setUser] = useState<AdminUser>({
        email: "",
        password: "",
    });

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
                navigate("/admin");
                onCloseAdmin();
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

const handleOpenRegister = () =>{
    onCloseAdmin();
    onOpenRegister();
}

  return (
    <AuthModal title='Sign as Admin' tag='Login as Admin' open={isOpenAdmin} onOpenChange={onChange}>
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
                <span className='text-blue-400 text-sm cursor-pointer w-full flex items-end justify-end pr-4' onClick={handleOpenRegister}>Register</span>
                {/* <span
                    className="text-sm text-blue-400 text-right w-full cursor-pointer"
                    onClick={handleForgot}
                >
                    Forgot Password
                </span> */}
                {/* {errors.password && (
                 toast.error (errors.password[0])
                )} */}
                {/* <p
                    className="w-full float-left text-[13px] cursor-pointer hover:underline"
                    onClick={handleClick}
                >
                    New to Ask All?{" "}
                    <span className="text-blue-400">Sign Up</span>
                </p> */}
                <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                    Sign In
                </Button>
            </form>


    </AuthModal>
  )
}

export default AdminModal;
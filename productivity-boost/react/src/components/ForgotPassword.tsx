
import AuthModal from './AuthModal'
import { modalController } from '@/hooks/modalController'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import { axiosClient } from '@/axios/axios.client';
import toast, { ToastBar } from 'react-hot-toast';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
interface EmailPassProps{
  email:string;
  password:string;
}
const ForgotPassword = () => {
  const navigate = useNavigate()
  const showPassword = useRef<HTMLInputElement>(null); 
  const showConfirmPassword = useRef<HTMLInputElement>(null); 
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password:false,
    confirmPass:false,
  })
  const [user, setUser] = useState<EmailPassProps>({
    email:'',
    password:'',
  })
 const [confirmPassword, setConfirmPassword] = useState<string>('')
    const modal = modalController()
    const onChange = () => {
        if (modal.isOpenForgot) {
            modal.onCloseForgot();
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      if(confirmPassword !== user.password){
        toast.error('Password does not match')
        return;
      }  
      const {email, password} = user;
      try {
       const response = axiosClient.post(`/forgot`,{email:email, password:password})
       console.log(response)
       setIsPasswordVisible(prevState => ({
        ...prevState,
        password: false, 
        confirmPass:false
      }));
      navigate('/')
      modal.onCloseForgot();
      toast.success('Succesful update password')
      if (showPassword.current && showConfirmPassword.current) {
        showPassword.current.type = 'password';
        showConfirmPassword.current.type = 'password';
      }
      } catch (error) {
        console.log(error)
      }
      
    }
  return (
    <div>
        <AuthModal title="Forgot Password" tag="Update your password" open={modal.isOpenForgot} onOpenChange={onChange}>
        <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit}>
         <label className="float-left w-full text-black">Verify Email</label>
                <input
                    type="email"
                    className="bg-gray-300/40 w-full p-1 rounded-md"
                    value={user?.email}
                     onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                 <label className="float-left w-full text-black">New Password</label>
                 <div className="flex w-full items-center justify-between">
                    <input
                        required
                        type="password"
                        className="bg-gray-300/40 w-full p-1 rounded-md"
                        value={confirmPassword}
                        onChange={(e) =>
                           setConfirmPassword(e.target.value)
                        }
                        ref={showPassword}
                    />
                    <div className="relative">
                        {!isPasswordVisible.password ?
                        <AiFillEyeInvisible
                            size={20}
                            className="absolute right-2 top-[-10px]"
                            onClick={() => {
                                if (showPassword.current) {
                                  showPassword.current.type = showPassword.current.type === 'text' ? 'password' : 'text';
                                }
                                setIsPasswordVisible(prevState => ({
                                  ...prevState,
                                  password: true, 
                                }));
                              }}
                        />
                    : <AiFillEye
                    size={20}
                    className="absolute right-2 top-[-10px]"
                    onClick={() => {
                        if (showPassword.current) {
                          showPassword.current.type = showPassword.current.type === 'text' ? 'password' : 'text';
                        }
                        setIsPasswordVisible(prevState => ({
                          ...prevState,
                          password: false, 
                        }));
                      }}
                />
                    }
                    </div>
                </div>
                   <label className="float-left w-full text-black">Confirm Password</label>
                   <div className="flex w-full items-center justify-between">
                    <input
                        required
                        type="password"
                        className="bg-gray-300/40 w-full p-1 rounded-md"
                        value={user?.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                      }
                        ref={showConfirmPassword }
                    />
                    <div className="relative">
                        {!isPasswordVisible.confirmPass ?
                        <AiFillEyeInvisible
                            size={20}
                            className="absolute right-2 top-[-10px]"
                            onClick={() => {
                                if (showConfirmPassword.current) {
                                  showConfirmPassword.current.type = showConfirmPassword.current.type === 'text' ? 'password' : 'text';
                                }
                                setIsPasswordVisible(prevState => ({
                                  ...prevState,
                                  confirmPass: true, 
                                }));
                              }}
                        />
                    : <AiFillEye
                    size={20}
                    className="absolute right-2 top-[-10px]"
                    onClick={() => {
                      if (showConfirmPassword.current) {
                        showConfirmPassword.current.type = showConfirmPassword.current.type === 'text' ? 'password' : 'text';
                      }
                        setIsPasswordVisible(prevState => ({
                          ...prevState,
                          confirmPass: false, 
                        }));
                      }}
                />
                    }
                    </div>
                </div>
                  <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                   Forgot Password
                </Button>
                </form>
        </AuthModal>
    </div>
  )
}

export default ForgotPassword
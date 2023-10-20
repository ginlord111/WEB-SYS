
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { axiosClient } from "@/axios/axios.client"
import { useEffect } from "react"
import toast from "react-hot-toast"
const Dashboard = () => {
  useEffect(() => {
    toast.success('You are now login')
  },[])
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleClick = async() =>{
    // log out in laravel
    axiosClient.post('/logout').then((res) =>{
        toast.success('Succesful Logout')
      window.localStorage.removeItem('access_token')
      setCookies("access_token", "");
      navigate('/')
      console.log(res)

    })
  }
  return (
  <h1 className='text-[100px] font-bold text-black'>
  Functionalities to be Develop...
    <Button onClick={handleClick}>Log Out</Button>
    </h1>
  )
}

export default Dashboard

import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { axiosClient } from "@/axios/axios.client"
const Dashboard = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleClick = async() =>{
    // log out in laravel
    axiosClient.post('/logout').then((res) =>{

      window.localStorage.removeItem('access_token')
      setCookies("access_token", "");
      navigate('/')
      console.log(res)
    })
  }
  return (
  <h1 className='text-[100px] font-bold text-black'>
    THIS IS DASHBOARD
    <Button onClick={handleClick}>Log Out</Button>
    </h1>
  )
}

export default Dashboard
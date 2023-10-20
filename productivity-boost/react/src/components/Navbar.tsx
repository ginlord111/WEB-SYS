import { modalController } from "@/hooks/modalController"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
const NavBar = () => {
  const [cookies, __] = useCookies(["access_token"]);
  const navigate = useNavigate()
  const handleClick = () =>{
  !cookies.access_token ? modal.onOpen() : navigate('/dashboard')
  }
  const modal = modalController()
  return (
    <nav className="my-5  text-white flex h-fit mx-5  pr-5 text-xl absolute w-[95%] whitespace-nowrap">
    <div className='w-full'>LOGO</div>
    
    <div className="border-solid border border-blue-400 px-4 py-2 cursor-pointer hover:bg-blue-400 hover:border-white transition mr-2" onClick={handleClick}>Get Started</div>
    <div className='text-sm text-blue-400 text-center cursor-pointer' onClick={()=>modal.onOpenAdmin()}>Login as admin</div>
</nav>
  )
}

export default NavBar
import { modalController } from "@/hooks/modalController"
const NavBar = () => {
  const modal = modalController()
  return (
    <nav className="my-5  text-white flex h-fit mx-5  pr-5 text-xl absolute w-[90%] justify-between">
    <div>LOGO</div>
    <div className="border-solid border border-blue-400 px-4 py-2 cursor-pointer hover:bg-blue-400 hover:border-white transition" onClick={modal.onOpen}>Get Started</div>
</nav>
  )
}

export default NavBar
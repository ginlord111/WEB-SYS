import NavBar from "./Navbar";
import BgVid from "../video/bg-vid1.mp4";
const LandingMain = () => {
    return (
        <div className="w-full h-screen relative">
           <div>
                <video
                    autoPlay
                    loop
                    muted
                    plays-inline
                    className="absolute right-0 bottom-0 z-[-1] w-full"
                >
                    <source src={BgVid} type="video/mp4" />
                </video>
            </div>
            <NavBar />
            <div className="absolute text-[120px] flex justify-center items-center h-full w-[50%] z-1 text-white ml-[150px] font-bold cursor-pointer">
                Boost Your Productivity
            </div>
        </div>
    );
};

export default LandingMain;

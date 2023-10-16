import { gsap } from "gsap";
import { useEffect } from "react";

const LandingInfo = () => {
    useEffect(() => {
        const scrollHandler = () => {
            const scrollY = window.scrollY;
            const fontSize = 10 + scrollY * 0.02; // Adjust the multiplier to control the growth rate

            gsap.to(".child", {
                fontSize: fontSize,
             ease: "power1.inOut", 
            });
        };

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <div className="parent w-full bg-black h-[800px] text-white flex justify-center items-center">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>

            <div className="w-full flex flex-col items-center">
                <p className="text-[50px] h-fit">Productivity Fusion: <span className="text-blue-400 font-bold">Your To-Do List + ChatGPT AI</span></p>
                <p className="child mt-[50px] w-[60%] text-[25px] transition">
                    Welcome to your productivity sanctuary! Our website
                    combines the power of a smart to-do list with the
                    intelligence of ChatGPT API. Say goodbye to distractions and
                    disorganization as you harness the perfect blend of task
                    management and AI assistance. Stay focused, achieve more,
                    and simplify your life with ease.
                </p>
            </div>
        </div>
    );
};

export default LandingInfo;

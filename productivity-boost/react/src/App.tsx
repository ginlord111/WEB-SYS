import LandingInfo from "./components/LandingInfo";
import LandingMain from "./components/LandingMain";
import AuthModal from "./components/AuthModal";
function App() {
    return (
        <div className="w-full">
            <AuthModal />
            <LandingMain />
            <LandingInfo />
        </div>
    );
}

export default App;

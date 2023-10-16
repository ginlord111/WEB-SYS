import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { modalController } from "@/hooks/modalController";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
const AuthModal = () => {
    const modal = modalController();
    const onChange = () => {
        if (modal.isOpen) {
            modal.onClose();
        }
    };
    return (
        <div className="w-full">
            <Dialog open={modal.isOpen} onOpenChange={onChange}>
                <DialogContent className="bg-white py-[100px] px-[100px]">
                    <DialogHeader>
                        <DialogTitle>
                            <p className="text-[40px] text-blue-700 font-bold">
                                Sign In
                            </p>
                            <p className="mt-[15px] mb-[40px]">
                                Please login to your Account
                            </p>
                        </DialogTitle>
                        <DialogDescription>
                            <form className="flex flex-col items-center justify-center gap-[10px]">
                                <label className="float-left w-full text-black">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="focus:border-transparent bg-gray-300/40 w-full p-1 rounded-md"
                                />
                                <label className="float-left w-full text-black">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="bg-gray-300/40 w-full p-1 rounded-md"
                                />
                                <Button className="rounded-xl text-base text-white mt-[20px] bg-blue-900 w-full hover:opacity-1">
                                    Sign In
                                </Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center items-center">
                        <p>or</p>
                        <div >
                            <GoogleLogin width={300}
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                            ;
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AuthModal;

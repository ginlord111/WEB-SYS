import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
} from "@/components/ui/dialog";
interface AuthModalProps {
    children: React.ReactNode;
    title: string;
    tag: string;
    open: boolean;
    onOpenChange: () => any;
}

const AuthModal = ({
    children,
    title,
    tag,
    open,
    onOpenChange,
}: AuthModalProps) => {
  
    return (
        <div className="w-full">
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogOverlay className=" backdrop-blur-md fixed inset-0">
                    <DialogContent className="bg-white py-[100px] px-[100px]  ">
                        <DialogHeader>
                            <DialogTitle>
                                <h3 className="text-[40px] text-blue-700 font-bold">
                                    {title}
                                </h3>
                                <p className="mt-[15px] mb-[40px]">{tag}</p>
                            </DialogTitle>
                            <DialogDescription>{children}</DialogDescription>
                        </DialogHeader>
                     
                    </DialogContent>
                </DialogOverlay>
            </Dialog>
        </div>
    );
};

export default AuthModal;

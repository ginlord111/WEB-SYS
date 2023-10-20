import {create} from 'zustand'

interface ModalControllerProps{
    isOpenLogin:boolean;
    onOpen:()=>any;
    onClose:()=>any;
    isOpenRegister:boolean;
    onOpenRegister:()=>any;
    onCloseRegister:()=>any;
    onOpenForgot:()=>any;
    onCloseForgot:()=>any;
    isOpenForgot:boolean;
    onOpenAdmin:()=>any;
    onCloseAdmin:()=>any;
    isOpenAdmin:boolean;
}

export const modalController = create<ModalControllerProps>((set) =>({
isOpenLogin:false,
onOpen:() => set ({isOpenLogin:true}),
onClose:() => set({isOpenLogin:false}),
isOpenRegister:false,
onOpenRegister:() => set ({isOpenRegister:true}),
onCloseRegister:() => set({isOpenRegister:false}),
isOpenForgot:false,
onOpenForgot:() => set ({isOpenForgot:true}),
onCloseForgot:() => set({isOpenForgot:false}),
isOpenAdmin:false,
onOpenAdmin:() => set ({isOpenAdmin:true}),
onCloseAdmin:() => set({isOpenAdmin:false})
}))
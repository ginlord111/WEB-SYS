import {create} from 'zustand'

interface ModalControllerProps{
    isOpenLogin:boolean;
    onOpen:()=>any;
    onClose:()=>any;
    isOpenRegister:boolean;
    onOpenRegister:()=>any;
    onCloseRegister:()=>any;
}

export const modalController = create<ModalControllerProps>((set) =>({
isOpenLogin:false,
onOpen:() => set ({isOpenLogin:true}),
onClose:() => set({isOpenLogin:false}),
isOpenRegister:false,
onOpenRegister:() => set ({isOpenRegister:true}),
onCloseRegister:() => set({isOpenRegister:false})
}))
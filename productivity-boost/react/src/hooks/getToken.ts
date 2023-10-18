import { useCookies } from "react-cookie"
export const getToken = () =>{
    const [cookies, __] = useCookies(["access_token"]);
    return  cookies.access_token;
}


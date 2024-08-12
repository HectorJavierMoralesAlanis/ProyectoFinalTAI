import {Navigate,Outlet} from "react-router-dom";
import {useAuth} from "../provider/authProvider";

export const ProtectedRoute= ()=>{

    const {token}=useAuth();
    //Revisa si esta autenticado el user
    if(!token){
        //Si no esta autenticado lo manda al login
        return <Navigate to="/login"/>;
    }
    
    return <Outlet />;
}
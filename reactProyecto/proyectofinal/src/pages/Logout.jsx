import {useNavigate} from "react-router-dom";
import {useAuth} from "../provider/authProvider";

const Logout = () =>{
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () =>{
        setToken();
        navigate("/",{replace:true});
    };
    setTimeout(()=>{
        handleLogout();
    });
    return <>Logout Page</>;
};
export default Logout;
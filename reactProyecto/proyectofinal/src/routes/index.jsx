import {RouterProvider,createBrowserRouter} from "react-router-dom";
import {useAuth} from "../provider/authProvider";
import {ProtectedRoute} from "./ProtectedRoute";
//import Login from "../pages/Login";
import Main from "../components/main";
import Login from "../components/login";
import Expediente from "../components/expendiente";

const Routes = ()=>{
    const {token}=useAuth();
    const routesForPublic =[
        {
            path:"/service",
            elemtn:<div>Service Page</div>,
        },
        {
            path:"/about-us",
            element:<div>About Us</div>,
        }
    ];
    const routesForAuthenticatedOnly = [
        {
            path:"/",
            element:<ProtectedRoute/>,
            children: [
                {
                    path: "/",
                    element: <Main></Main>,
                },
                {
                    path: "/expediente",
                    element: <Expediente></Expediente>,
                },
                {
                    path: "/logout",
                    element:<div>Logout</div>,
                }
            ]
        }
    ];
    const routesForNotAuthenticatedOnly= [
        {
            path: "/",
            element:<Login></Login>,
        },
        {
            path: "/login",
            element:<Login></Login>,
        },
    ];
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);
    return <RouterProvider router={router} />;
}
export default Routes;
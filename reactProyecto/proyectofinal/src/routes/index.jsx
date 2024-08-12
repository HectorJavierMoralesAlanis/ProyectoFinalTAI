import {RouterProvider,createBrowserRouter} from "react-router-dom";
import {useAuth} from "../provider/authProvider";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "../pages/Login";

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
                    element: <div>User Home Page</div>,
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
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
            element:<div>Home Page</div>,
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
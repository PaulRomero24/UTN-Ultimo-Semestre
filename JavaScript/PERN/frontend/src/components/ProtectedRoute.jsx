import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute =({redirectTO,isAllowed,children}) =>{
    if(!isAllowed){
        return <Navigate to= {redirectTO} replace />
    }
    return children ? children: <Outlet />
}
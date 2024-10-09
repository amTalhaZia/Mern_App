import { Navigate } from "react-router";
import { useAuth } from "../../context/Auth";



const ProtectedRoute = ({children}) => {
    const {user} =  useAuth()

        if (!user) {
           return  <Navigate to="/login" />
        }

        return children


}

export default ProtectedRoute
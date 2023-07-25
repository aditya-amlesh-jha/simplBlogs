import { Navigate } from "react-router-dom";

const LoggedRoute = ({isLogged,children})=>{

    if(isLogged){
        return <Navigate to="/" />
    }
    return children;
}

export default LoggedRoute;
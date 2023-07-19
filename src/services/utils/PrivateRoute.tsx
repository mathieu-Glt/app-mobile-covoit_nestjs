import { Redirect } from "react-router";
import SignPage from "../../pages/Sign/SignPage";


export default function PrivateRoutes({children} : any) {
    
    const auth = localStorage.getItem('accessToken');
    // const auth = true;

    return (
        auth ? children : <Redirect to="/login" />
    );
}
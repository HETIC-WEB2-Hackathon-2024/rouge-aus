import {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {authenticatedPost} from "../auth/helper";
import {setToken, setUserInfos, useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router";

export default function Layout(){
    const {dispatch} = useAuth();
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const setupContext = async () => {
            const token = await getAccessTokenSilently();
            dispatch(setToken(token));
            const userInfos = await authenticatedPost(token, "/v1/candidats", {email: user?.email});
            dispatch(setUserInfos(userInfos));
        }
        setupContext();
        navigate( '/dashboard')
    }, []);

    return null;
}
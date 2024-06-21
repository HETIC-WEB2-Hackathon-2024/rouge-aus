import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {setToken, setUserInfos} from "../context/AuthContext.tsx";
import {authenticatedPost} from "./helper.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {useLocation} from "react-router";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";
/**
 * Makes sure user is authenticated before rendering children.
 *
 * If user is not authenticated, it will be redirected to login page provided
 * by Auth0.
 *
 */

export function Authenticated({children}: React.PropsWithChildren) {
    const {loginWithRedirect, user, isLoading, error, getAccessTokenSilently} = useAuth0();
    const { state, dispatch } = useAuth();
    const [isSetup, setIsSetup] = React.useState(false);
    const [isOnLandingPage, setIsOnLandingPage] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         if(user && state.user?.email){

    //             navigate('/layout')
    //         }else{
    //             loginWithRedirect(
    //                 {
    //                     authorizationParams: {
    //                         redirect_uri: `http://localhost:5173/layout`
    //                     }
    //                 }
    //             );
    //         }
    //     }, 19000)
    // },);

    return  <>{children}</> 
}

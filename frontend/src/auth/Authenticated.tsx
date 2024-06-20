import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {setToken, setUserInfos} from "../context/AuthContext.tsx";
import {authenticatedPost} from "./helper.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {useLocation} from "react-router";
/**
 * Makes sure user is authenticated before rendering children.
 *
 * If user is not authenticated, it will be redirected to login page provided
 * by Auth0.
 *
 */

const SetupContext = async ({user,getAccessTokenSilently, dispatch})=> {
  //  const {getAccessTokenSilently, user} = useAuth0();
    // const {dispatch} = useAuth();
    const token = await getAccessTokenSilently();
    console.log('token', token, user?.email)
    dispatch(setToken(token));
    const userInfos = await authenticatedPost(token, "/v1/candidats", {email: user?.email});
    dispatch(setUserInfos(userInfos));
}


export function Authenticated({children}: React.PropsWithChildren) {
    const {loginWithRedirect, user, isLoading, error, getAccessTokenSilently} = useAuth0();
    const { state, dispatch } = useAuth();
    const [isSetup, setIsSetup] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
            if (error) {
                return;
            } else if((!user && !isLoading)){
                loginWithRedirect(
                    {
                        authorizationParams: {
                            redirect_uri: `http://localhost:5173/layout`
                        }
                    }
                );}
    }, [user, isLoading, loginWithRedirect, error]);


    if (error) return <div>Oops... {error.message}</div>;
    return isLoading ? <div>Loading...</div> : <>{children}</>
}

import React from "react";
import {useAuth0} from "@auth0/auth0-react";

/**
 * Makes sure user is authenticated before rendering children.
 *
 * If user is not authenticated, it will be redirected to login page provided
 * by Auth0.
 *
 */
export function Authenticated({children}: React.PropsWithChildren) {
    const {loginWithRedirect, user, isLoading, error} = useAuth0();
    React.useEffect(() => {
        console.log('test')
        console.log('isLoading', isLoading)
        console.log(children)
        if (error) {
            console.log("Error in Authenticated component", error);
            return;
        } else if(!user && !isLoading){
            console.log("Error in Authenticated component 2");
             loginWithRedirect();
        }
    }, [user, isLoading, loginWithRedirect, error]);

    if (error) return <div>Oops... {error.message}</div>;
    return isLoading ? <div>Loading...</div> : <>{children}</>;
}

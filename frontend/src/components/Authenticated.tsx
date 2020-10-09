import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Authenticated: React.FC = ({ children }) => {
    const { loginWithRedirect, user, isLoading } = useAuth0();

    React.useEffect(() => {
        const redirect = async () => {
            if (!user && !isLoading) {
                await loginWithRedirect();
            }
        }
        redirect()
    }, [isLoading])
    return isLoading ? <span>Loading ...</span> : <>{children}</>;
};
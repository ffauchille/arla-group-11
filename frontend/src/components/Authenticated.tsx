import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Loading";
import { TemplateMachineContext } from "../state/provider";
import { TemplateEvents } from "../state/machine";
import { callApi } from "../utils/api";

export const AUTH_DOMAIN = "arlaide-group-11.eu.auth0.com";
export const AUTH_CLIENT_ID = "zEcxeM5zzDXTQsHHIrRA3rbu53cNTL18";
export const API_IDENTIFIER = "https://api.groupe11.arla-sigl.fr";

const WithPermissions: React.FC = ({ children }) => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { permissions } = machine.context;
  const {getAccessTokenSilently} = useAuth0();

  React.useEffect(() => {
    const getClaims = async () => {
      try {
        const authToken = await getAccessTokenSilently();
        const userPermissions = await callApi(`/v1/permissions`);
        send({
          type: TemplateEvents.setUserPermissions,
          permissions: userPermissions,
        });
      } catch (error) {
        console.log("Error getting user permissions: ", error);
      }
    };
    getClaims();
  }, []);

  return permissions === undefined ? <Loading /> : <>{children}</>;
};

/**
 * Redirect the user to the Auth0 login page, if the user is not logged in.
 */
export const Authenticated: React.FC = ({ children }) => {
  const { loginWithRedirect, user, isLoading } = useAuth0();

  React.useEffect(() => {
    const redirect = async () => {
      if (!user && !isLoading) {
        await loginWithRedirect();
      }
    };
    redirect();
  }, [isLoading]);

  return isLoading ? <Loading /> : <WithPermissions>{children}</WithPermissions>;
};


export const NoAuthentication: React.FC = ({children}) => {
  return <>{children}</>
}
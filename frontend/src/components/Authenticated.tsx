import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Loading";
import { TemplateMachineContext } from "../state/provider";
import { TemplateEvents } from "../state/machine";
import { callApi } from "../utils/api";

export const AUTH_DOMAIN = "arlaide-group-11.eu.auth0.com";
export const AUTH_CLIENT_ID = "zEcxeM5zzDXTQsHHIrRA3rbu53cNTL18";
export const API_IDENTIFIER = "https://api.groupe11.arla-sigl.fr";

type WithPermissionsProps = {
  authToken: string;
};

const WithPermissions: React.FC<WithPermissionsProps> = ({ authToken, children }) => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { permissions } = machine.context;

  React.useEffect(() => {
    const getClaims = async () => {
      try {
        const userPermissions = await callApi(authToken)(`/v1/permissions`);
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
 * This component is setting the token to the the state machine's context.
 * This will enable you to call the api with the token from the context directly, instead
 * of calling getAccessTokenSilently from every components that triggers any secured API calls.
 */
const WithToken: React.FC = ({ children }) => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { getAccessTokenSilently } = useAuth0();
  const { authToken } = machine.context;

  React.useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      send({ type: TemplateEvents.setAuthToken, token });
    };
    getToken();
  }, [authToken]);

  return authToken ? (
    <WithPermissions authToken={authToken}>{children}</WithPermissions>
  ) : (
    <Loading />
  );
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

  return isLoading ? <Loading /> : <WithToken>{children}</WithToken>;
};

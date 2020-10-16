import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import React from "react";

export const Logout: React.FC = () => {
  const { logout } = useAuth0();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        logout({ returnTo: document.location.origin });
      }}
    >
      Logout
    </Button>
  );
};

import { Button, Grid, Typography, Card } from "@material-ui/core";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { TemplateEvents } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";

export const TemplateView2: React.FC = () => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { helpRequests } = machine.context;
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = React.useState<string>();

  React.useEffect(() => {
    const getToken = async () => {
      const authToken = await getAccessTokenSilently();
      setToken(authToken);
    }
    getToken()
  }, [token]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Typography align='right'>Update global count</Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          disabled={!token}
          color="primary"
          onClick={() => {
            send({ type: TemplateEvents.loadHelpRequests, token });
          }}
        >
          Load Requests
        </Button>
      </Grid>
      <Grid item xs={12}>
          {helpRequests && (helpRequests as any[]).map((hr, i) => (
            <Card key={i}>
              Request ID: {hr.id}
              Request Location: {hr.location} 
            </Card>
          ))}
      </Grid>
    </Grid>
  );
};

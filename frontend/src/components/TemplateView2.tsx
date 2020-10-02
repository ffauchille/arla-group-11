import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { TemplateEvents } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";

export const TemplateView2: React.FC = () => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { count } = machine.context;

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Typography align='right'>Update global count</Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            send({ type: TemplateEvents.udpateCount, newCount: count + 1 });
          }}
        >
          +1
        </Button>
      </Grid>
    </Grid>
  );
};

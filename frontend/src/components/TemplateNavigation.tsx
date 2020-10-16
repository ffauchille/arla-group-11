import { Button, Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { TemplateEvents, TemplateStates } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";

export const TemplateNavigation = () => {
  const { machine, send } = React.useContext(TemplateMachineContext);

  let tabSelected = 0;
  if (machine.matches(TemplateStates.view2)) tabSelected = 1;
  else if (machine.matches(TemplateStates.view3)) tabSelected = 2;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Tabs
          centered
          value={tabSelected}
          onChange={(_, idx) => {
            let nextView = TemplateEvents.toView1;
            if (idx === 1) nextView = TemplateEvents.toView2;
            else if (idx === 2) nextView = TemplateEvents.toView3;
            send(nextView);
          }}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab label="View 1" />
          <Tab label="View 2" />
          <Tab label="View 3" />
        </Tabs>
      </Grid>
    </Grid>
  );
};

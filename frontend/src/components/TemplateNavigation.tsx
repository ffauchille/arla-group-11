import { Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { TemplateEvents, TemplateStates } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";

export const TemplateNavigation = () => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const tabSelected = machine.matches(TemplateStates.view1) ? 0 : 1;
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Tabs
          centered
          value={tabSelected}
          onChange={(_, idx) => {
            const nextView =
              idx === 0 ? TemplateEvents.toView1 : TemplateEvents.toView2;
            send(nextView);
          }}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab label="View 1" />
          <Tab label="View 2" />
        </Tabs>
      </Grid>
    </Grid>
  );
};

import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { TemplatePaper } from "./TemplatePaper";

type TemplateContentProps = {
  project: string;
};

export const TemplateView1: React.FC<TemplateContentProps> = ({ project }) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <TemplatePaper>
          <Typography>{project}</Typography>
        </TemplatePaper>
      </Grid>
      <Grid item xs={4}>
        <TemplatePaper>
          <Typography>EPITA</Typography>
        </TemplatePaper>
      </Grid>
      <Grid item xs={4}>
        <TemplatePaper>
          <Typography>SIGL - 2021</Typography>
        </TemplatePaper>
      </Grid>
    </Grid>
  );
};

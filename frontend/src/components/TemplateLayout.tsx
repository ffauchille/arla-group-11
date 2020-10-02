import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { TemplateMachineContext } from "../state/provider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export const TemplateLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const { machine } = React.useContext(TemplateMachineContext);
  const { count } = machine.context;

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={12}>
        <Typography variant="h1" align="center" gutterBottom>
          Frontend Workshop
        </Typography>
        <Typography variant="subtitle1" align="center">
          EPITA SIGL 2021
        </Typography>
        <Typography variant="subtitle2" align="center" color='primary'>
          Global count: {count}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

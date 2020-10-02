import {
  createStyles,
  makeStyles,
  Paper,
  PaperProps,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      minHeight: theme.spacing(15),
    },
    dark: {
      color: theme.palette.primary.main,
      backgroundColor: 'whitesmoke'
    },
    bright: {
      color: theme.palette.text.primary,
      backgroundColor: 'white'
    }
  })
);

export const TemplatePaper: React.FC<PaperProps> = ({
  children,
  className,
  elevation,
  ...paperProps
}) => {
  const classes = useStyles();
  const [paperColor, togglePaperColor] = React.useState<'bright' | 'dark'>('bright');
  const paperColorClass = paperColor === 'bright' ? classes.bright : classes.dark;
  
  return (
    <Paper elevation={elevation || 3} onClick={() => {
      togglePaperColor(paperColor === 'bright' ? 'dark' : 'bright');
    }} className={`${classes.paper} ${paperColorClass} ${className}`} {...paperProps}>
      {children}
    </Paper>
  );
};

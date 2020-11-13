import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { callApi } from "../utils/api";

type CommentProps = {
  text: string;
  timestamp: number;
};

type CommentsProps = {
  helpRequestId: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(64),
        height: theme.spacing(16),
        overflowY: "scroll",
      },
    },
  })
);

const Comment: React.FC<CommentProps> = ({ text, timestamp }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="caption">
              {new Date(timestamp).toDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ overflowWrap: "break-word" }}>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export const Comments: React.FC<CommentsProps> = ({ helpRequestId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [comments, setComments] = React.useState<any[]>([]);
  React.useEffect(() => {
    const getComments = async () => {
      const token = await getAccessTokenSilently();
      const commentList = await callApi(token)(
        `/v1/comment?helpRequestId=${helpRequestId}`
      );
      setComments(commentList);
    };
    getComments();
  }, []);

  return (
    <Grid container>
      {comments.map((comment, idx) => (
        <Comment key={idx} text={comment.text} timestamp={comment.timestamp} />
      ))}
    </Grid>
  );
};

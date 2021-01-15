import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { TemplateMachineContext } from "../state/provider";
import { callApi } from "../utils/api";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const GoPremium: React.FC = () => {
  return (
    <Button variant="outlined" color="primary" onClick={() => {}}>
      Get premium access today!
    </Button>
  );
};

type ProfileCardProps = {
  username: string;
  job: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ username, job }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Grieveson.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Contact
        </Button>
        <Button size="small" color="secondary">
          See activities
        </Button>
      </CardActions>
    </Card>
  );
};

const UserProfiles: React.FC = () => {
  const [userProfiles, setUserProfiles] = React.useState<any[]>([]);

  const getUserProfiles = async () => {
    const data = await callApi("/v1/user-profile?page=1&limit=10");
    setUserProfiles(data);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => getUserProfiles()}
        >
          Load user profiles
        </Button>
      </Grid>
      {(userProfiles as any[]).map((userProfile, index) => (
        <Grid key={index} item xs={4}>
          <ProfileCard username={userProfile.username} job={userProfile.job} />
        </Grid>
      ))}
    </Grid>
  );
};

export const TemplateView3: React.FC = () => {
  const { machine } = React.useContext(TemplateMachineContext);
  const { permissions } = machine.context;
  const canReadProfile = permissions?.includes("profiles:full-access");

  return canReadProfile ? <UserProfiles /> : <GoPremium />;
};

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { TemplateEvents } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";
import { useAuth0 } from "@auth0/auth0-react";
import { callApi } from "../utils/api";
import { Comments } from "./Comments";

type ClosableErrorProps = {
  onClickClose: Function;
};

const ClosableError: React.FC<ClosableErrorProps> = ({ onClickClose, children }) => (
  <Alert
    severity="error"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => onClickClose()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
  >
    {children}
  </Alert>
);

type HelpRequestTableProps = {
  helpRequests: any[];
};

const HelpRequestTable: React.FC<HelpRequestTableProps> = ({
  helpRequests,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Help request ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="left">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {helpRequests.map((hr, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {hr.help_request_id}
              </TableCell>
              <TableCell align="right">{hr.title}</TableCell>
              <TableCell align="right">{hr.city}</TableCell>
              <TableCell align="right">{hr.country}</TableCell>
              <TableCell align="right"><Comments helpRequestId={hr.help_request_id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TemplateView2: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [helpRequests, setHelpRequests] = React.useState<any[]>([]);
  const [error, setError] = React.useState<any>();

  const getHelpRequests = async () => {
    const token = await getAccessTokenSilently();
    try {
      const data = await callApi(token)("/v1/help-request?page=1&limit=10");
      setHelpRequests(data);
    } catch (error) {
      // something went wrong!
      setError(error);
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getHelpRequests();
          }}
        >
          Load Requests
        </Button>
      </Grid>
      <Grid item xs={12}>
        {error ? (
          <ClosableError onClickClose={() => setError(undefined)}>Something went wrong on our side...</ClosableError>
        ) : (
          <HelpRequestTable helpRequests={helpRequests} />
        )}
      </Grid>
    </Grid>
  );
};

export const TemplateView2_old: React.FC = () => {
  const { machine, send } = React.useContext(TemplateMachineContext);
  const { helpRequests } = machine.context;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            send({ type: TemplateEvents.loadHelpRequests });
          }}
        >
          Load Requests
        </Button>
      </Grid>
      <Grid item xs={12}>
        <HelpRequestTable helpRequests={helpRequests} />
      </Grid>
    </Grid>
  );
};

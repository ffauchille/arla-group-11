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
} from "@material-ui/core";
import React from "react";
import { TemplateEvents } from "../state/machine";
import { TemplateMachineContext } from "../state/provider";

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
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {helpRequests.map((hr, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {hr.id}
              </TableCell>
              <TableCell align="right">{hr.location}</TableCell>
              <TableCell align="right">{hr.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TemplateView2: React.FC = () => {
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

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { ExperimentStatusIcon } from "components/ExperimentStatusIcon";
import { Page } from "components/Page";
import { clearExperiments, getExperiments } from "mock";
import { Experiment } from "mock/types";

import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      cursor: "pointer",
    },
  })
);

export const ExperimentList = () => {
  const classes = useStyles();
  const history = useHistory();

  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    getExperiments().then(setExperiments);
    const handler = setInterval(() => {
      getExperiments().then(setExperiments);
    }, 1000);
    return () => clearInterval(handler);
  }, []);

  const handleClear = async () => {
    await clearExperiments();
    getExperiments().then(setExperiments);
  };

  return (
    <Page>
      <Container maxWidth="md">
        <Paper>
          <Toolbar>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              全削除
            </Button>
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>送信</TableCell>
                  <TableCell>開始</TableCell>
                  <TableCell>終了</TableCell>
                  <TableCell>実験名</TableCell>
                  <TableCell>機器名</TableCell>
                  <TableCell>実行状態</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {experiments.map(
                  ({ id, name, device, submit, start, end, status }) => (
                    <TableRow
                      key={id}
                      hover={true}
                      className={classes.tableRow}
                      onClick={() => history.push(`/experiments/${id}`)}
                    >
                      <TableCell>
                        <Typography color="textSecondary">
                          {new Date(submit).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary">
                          {start && new Date(start).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary">
                          {end && new Date(end).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">{name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">{device}</Typography>
                      </TableCell>
                      <TableCell>
                        <ExperimentStatusIcon status={status} />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Page>
  );
};

export default ExperimentList;

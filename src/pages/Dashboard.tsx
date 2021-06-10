import React, { useEffect, useState } from "react";

import { Page } from "components/Page";
import { getDevices } from "mock";
import { Device } from "mock/types";

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

export const Dashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDevices().then(setDevices);
    const handler = setInterval(() => getDevices().then(setDevices), 1000);
    return () => clearInterval(handler);
  }, []);

  return (
    <Page>
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>名前</TableCell>
                  <TableCell>状態</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map(({ name, cap, jobs }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <Typography>{name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {jobs}/{cap}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Page>
  );
};

export default Dashboard;

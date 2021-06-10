import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { Page } from "components/Page";
import { addExperiment } from "mock";

import {
  Button,
  Container,
  createStyles,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";

interface NewExperimentProps {}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    select: {
      minWidth: 120,
    },
  });
});

type Inputs = {
  name: string;
  device: string;
};

export const NewExperiment = (props: NewExperimentProps) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = ({ name, device }: Inputs) => {
    addExperiment(name, device);
    history.push("/experiments");
  };

  return (
    <Page>
      <Container maxWidth="sm">
        <Paper>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="実験名"
                      fullWidth
                      error={"name" in errors}
                      helperText={"name" in errors ? "必須項目" : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel error={"device" in errors} id="device-label">
                  機器名
                </InputLabel>
                <Controller
                  name="device"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      labelId="device-label"
                      error={"device" in errors}
                      className={classes.select}
                      {...field}
                    >
                      <MenuItem value="プリンタ１">プリンタ１</MenuItem>
                      <MenuItem value="プリンタ２">プリンタ２</MenuItem>
                      <MenuItem value="大判プリンタ">大判プリンタ</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText error={"device" in errors}>
                  {"device" in errors ? "必須項目" : ""}
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  送信
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </Page>
  );
};

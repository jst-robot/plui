import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

export type PageProps = {
  children?: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    link: {
      color: "white",
      "&:hover": {
        color: "white",
        textDecoration: "none",
      },
    },
  })
);

export const Page = (props: PageProps) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.link}>
              PLUI
            </Link>
          </Typography>
          <Box>
            <Button>
              <Link to="/experiments" className={classes.link}>
                実験一覧
              </Link>
            </Button>
          </Box>
          <Box>
            <IconButton color="inherit">
              <Link to="/experiments/new" className={classes.link}>
                <Add />
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Paper elevation={0}>
        <div>{props.children}</div>
      </Paper>
    </div>
  );
};

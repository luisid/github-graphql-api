import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  container: {
    height: "calc(100vh - 64px)",
  },
}));

function Root(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Github Repos
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction="column" className={classes.container} />
    </>
  );
}

export { Root };

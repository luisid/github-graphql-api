import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { RepoListPage } from "../pages/RepoList";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  container: {
    height: "calc(100vh - 64px)",
  },
}));

const queryClient = new QueryClient();

function Root(): JSX.Element {
  const classes = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Github Repos
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction="column" className={classes.container}>
        <RepoListPage />
      </Grid>
    </QueryClientProvider>
  );
}

export { Root };

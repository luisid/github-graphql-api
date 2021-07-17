import {
  Container,
  makeStyles,
  Grid,
  Input,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { ReactElement } from "react";
import { RepoList } from "./components/List";
import { useRepoList } from "./hooks";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
  filters: {},
  list: {
    flexGrow: 1,
  },
  listInner: {
    height: "100%",
  },
  search: {
    width: "100%",
  },
}));

/**
 * Repository List Page with infinity scrolling pagination
 * @returns {ReactElement}
 */
const RepoListPage: React.FC = (): ReactElement => {
  const { filters, list, listInner, container, search } = useStyles();
  const { query, handleChange } = useRepoList();

  return (
    <>
      <Grid container direction="column" className={container}>
        <Grid xl={12} className={filters} item container>
          <Container>
            <FormControl className={search}>
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                value={query}
                name="search"
                id="search"
                onChange={handleChange}
              />
            </FormControl>
          </Container>
        </Grid>
        <Grid className={list} item>
          <Container className={listInner}>
            <RepoList query={query} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export { RepoListPage };

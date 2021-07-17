import { FC, ReactElement } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { InfiniteData } from "react-query";
import { ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { List } from "../../../../components/List";
import { RepoType, SearchNodes } from "./graphql/repos";
import { useList } from "./hooks";

type ListData = InfiniteData<SearchNodes<RepoType>> | undefined;

export type RepoListProps = {
  query: string;
};

const pageSize = 50;

const RepoList: FC<RepoListProps> = ({ query }) => {
  const { data, itemCount, fetchNextPage, isItemLoaded, isPageLoaded } =
    useList(query, pageSize);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List<ListData>
          data={data}
          fetchNextPage={fetchNextPage}
          isItemLoaded={isItemLoaded}
          isPageLoaded={isPageLoaded}
          pageSize={pageSize}
          itemCount={itemCount}
          height={height}
          width={width}
        >
          {({
            index,
            style,
            data: listData,
          }: ListChildComponentProps<ListData>): ReactElement => {
            const page = Math.trunc(index / pageSize);
            let content;
            if (!listData) {
              content = "";
            } else if (listData.pages[page]) {
              const { nameWithOwner, stargazers, forkCount } =
                listData.pages[page].nodes[index % pageSize];
              content = `${nameWithOwner} - 🌟 ${stargazers.totalCount} - 🍴 ${forkCount}`;
            } else {
              content = "loading...";
            }

            return (
              <ListItem style={style}>
                <ListItemText>{content}</ListItemText>
              </ListItem>
            );
          }}
        </List>
      )}
    </AutoSizer>
  );
};

export { RepoList };

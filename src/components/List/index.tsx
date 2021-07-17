import { ReactElement, useCallback, useRef } from "react";
import { List as MaterialUIList } from "@material-ui/core";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

/**
 * @type {ListProps<T>}
 */
export type ListProps<T> = {
  width: number;
  height: number;
  pageSize: number;
  itemCount: number;
  data: T;
  isItemLoaded: (index: number) => boolean;
  isPageLoaded: (page: number) => boolean;
  fetchNextPage: (page: number) => Promise<any>;
  children: (renderProps: ListChildComponentProps) => ReactElement;
};

/**
 * @param {ListProps}
 * @returns {ReactElement}
 */
function List<T>({
  width,
  height,
  pageSize,
  isItemLoaded,
  isPageLoaded,
  fetchNextPage,
  itemCount,
  data,
  children,
}: ListProps<T>): ReactElement {
  const pageLoaderRef = useRef<Record<string, any>>({});

  const loadMoreItems = useCallback(
    async (startIndex: number) => {
      const page = Math.trunc(startIndex / pageSize);

      const pageLoaded = isPageLoaded(page);

      if (pageLoaded || pageLoaderRef.current[page]) {
        return;
      }

      await fetchNextPage(page);
      delete pageLoaderRef.current[page];
    },
    [pageSize, isPageLoaded, fetchNextPage]
  );

  return (
    <MaterialUIList>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        minimumBatchSize={pageSize}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList<T>
            onItemsRendered={onItemsRendered}
            itemCount={itemCount}
            itemSize={30}
            width={width}
            height={height}
            itemData={data}
            ref={ref}
          >
            {children}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </MaterialUIList>
  );
}

export { List };

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";

function useInfiniteScroll({
  query,
  items,
  setItems,
  queryArgs,
  dataSelector,
  metaSelector,
}) {
  const [page, setPage] = useState(1);
  const observer = (useRef < IntersectionObserver) | (null > null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { data, error, isLoading, isFetching } = query({
    ...queryArgs,
    page,
  });

  useEffect(() => {
    const newItems = dataSelector(data) || [];
    const meta = metaSelector(data) || { totalPage: 1 };

    if (newItems.length) {
      setItems((prev) => {
        const unique = newItems.filter(
          (item) => !prev.some((existing) => existing._id === item._id)
        );
        return [...prev, ...unique];
      });
      setHasNextPage(page < meta?.totalPage);
    }
  }, [data, page, setItems]);

  const lastItemRef = useCallback(
    (node) => {
      if (isFetching || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage]
  );

  return {
    items,
    error,
    isLoading,
    lastItemRef,
    isFetchingNextPage: isFetching,
  };
}

export default useInfiniteScroll;

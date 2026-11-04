import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // The page body is a scroll container of its own, and ViewportFlow decides
    // where each page starts. Router restoration would fight that decision and
    // drop the incoming page part-way down the previous page's scroll.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

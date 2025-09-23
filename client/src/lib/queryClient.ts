import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { api } from "../services/api";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const response = await api({
    method,
    url,
    data,
  });
  
  // Convert axios response to fetch-like Response for compatibility
  return new Response(JSON.stringify(response.data), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers as HeadersInit,
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Use the authenticated axios instance for all queries
      const response = await api.get(queryKey.join("/") as string);
      return response.data;
    } catch (error: any) {
      if (unauthorizedBehavior === "returnNull" && error.response?.status === 401) {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

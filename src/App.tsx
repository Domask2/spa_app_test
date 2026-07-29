import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routes.tsx";
import {Toaster} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 минут
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </QueryClientProvider>
  )
}

export default App

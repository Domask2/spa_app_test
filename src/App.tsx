import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMswStore } from "./store/mswStore.ts";
import { AppSkeleton } from "./shared/ui/AppSkeleton.tsx";

export function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
			},
		},
	});

	const isMswReady = useMswStore((state) => state.isReady);

	if (!isMswReady) {
		return <AppSkeleton />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
			<Toaster position="bottom-right"/>
		</QueryClientProvider>
	)
}

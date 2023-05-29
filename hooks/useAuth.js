import { persistUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export function usePersistUser() {
	return useQuery({
		queryKey: ["persist-user"],
		queryFn: persistUser,
		retry: false,
		refetchOnWindowFocus: true,
	});
}

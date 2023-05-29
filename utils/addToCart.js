import { useMutation, useQueryClient } from "@tanstack/react-query";

const HandleAddToCart = async (user, productId) => {
	const { data, isLoading, mutateAsync } = useMutation({
		mutationFn: addToCart,
	});
	const queryClient = useQueryClient();

	if (!user) {
		toast.error("Please login first");
	} else {
		try {
			const { message } = await mutateAsync(productId);
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["persist-user"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}

	return { isLoading, data };
};

export default HandleAddToCart;

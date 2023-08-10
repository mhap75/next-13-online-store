import { getCatList } from "@/services/category";
import {
	addNewCategory,
	addNewCoupon,
	addNewProduct,
	deleteCategory,
	deleteCoupon,
	deleteProduct,
	editCategory,
	editProduct,
	getCategoryByID,
	getCouponsList,
	getPaymentsList,
	getProductByID,
	getProductList,
} from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useProductsList() {
	return useQuery({
		queryKey: ["get-products"],
		queryFn: getProductList,
		retry: false,
		refetchOnWindowFocus: true,
	});
}

export function usePaymentsList() {
	return useQuery({
		queryKey: ["get-payments"],
		queryFn: getPaymentsList,
		retry: false,
		refetchOnWindowFocus: true,
	});
}

export function useCouponsList() {
	return useQuery({
		queryKey: ["get-coupons"],
		queryFn: getCouponsList,
		retry: false,
		refetchOnWindowFocus: true,
	});
}

export function useCategoriesList() {
	return useQuery({
		queryKey: ["get-categories"],
		queryFn: getCatList,
		retry: false,
		refetchOnWindowFocus: true,
	});
}

export const useAddProduct = () => {
	return useMutation({ mutationFn: addNewProduct });
};

export const useAddCoupon = () => {
	return useMutation({ mutationFn: addNewCoupon });
};

export const useAddCategory = () => {
	return useMutation({ mutationFn: addNewCategory });
};

export const useDelProduct = () => {
	return useMutation({ mutationFn: deleteProduct });
};

export const useDelCategory = () => {
	return useMutation({ mutationFn: deleteCategory });
};

export const useDelCoupon = () => {
	return useMutation({ mutationFn: deleteCoupon });
};

export const useEditProduct = () => {
	return useMutation({ mutationFn: editProduct });
};

export const useEditCategory = () => {
	return useMutation({ mutationFn: editCategory });
};

export const useProduct = (id) => {
	return useQuery({
		queryKey: ["get-product", id],
		queryFn: () => getProductByID(id),
		retry: false,
		refetchOnWindowFocus: true,
	});
};

export const useCategory = (id) => {
	return useQuery({
		queryKey: ["get-category", id],
		queryFn: () => getCategoryByID(id),
		retry: false,
		refetchOnWindowFocus: true,
	});
};

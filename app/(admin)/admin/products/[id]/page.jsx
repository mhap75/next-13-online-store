"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Spin } from "antd";
import { useRouter } from "next/navigation";
import AddProductForm from "../AddProductForm";
import { useEditProduct, useProduct } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";

const initialFormValues = {
	title: "",
	brand: "",
	price: 1,
	discount: 0,
	countInStock: 1,
	category: "",
	tags: [],
	imageLink: "",
	slug: "",
	description: "",
};

function ProductById({ params, searchParams }) {
	const router = useRouter();
	const { data, isLoading } = useProduct(params.id);
	const { product } = data || {};
	const {
		title,
		brand,
		price,
		discount,
		countInStock,
		category,
		tags,
		imageLink,
		slug,
		description,
	} = product || initialFormValues;
	const { isLoading: submitLoading, mutateAsync } = useEditProduct();

	const handleEditProduct = async (data) => {
		try {
			const { message } = await mutateAsync({
				productId: params.id,
				data,
			});
			toast.success(message);
			router.push('admin/products')
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	if (isLoading)
		return (
			<Card className="m-2">
				<Skeleton loading active />
			</Card>
		);

	return (
		<Card
			className="m-2"
			extra={
				<Button
					icon={<ArrowLeftOutlined />}
					onClick={() => router.back()}
					type="text"
				>
					Go back
				</Button>
			}
			title={<span>Product ID: {params.id.toUpperCase()}</span>}
		>
			<AddProductForm
				onSubmit={handleEditProduct}
				submitLoading={submitLoading}
				actionBtn="Edit"
				initialFormValues={{
					title,
					brand,
					price,
					discount,
					countInStock,
					category: {
						value: category._id,
						label: category.title,
					},
					tags,
					imageLink,
					slug,
					description,
				}}
			/>
		</Card>
	);
}

export default ProductById;

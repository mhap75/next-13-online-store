"use client";

import {
	useAddCategory,
	useAddProduct,
	useDelProduct,
	useProductsList,
} from "@/hooks/useProducts";
import {
	Avatar,
	Button,
	Card,
	Modal,
	Popconfirm,
	Skeleton,
	Space,
	Table,
	Tag,
} from "antd";
import Link from "next/link";
import AddProductForm from "./AddProductForm";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AddCatForm from "./AddCatForm";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const initialFormValues = {
	title: "",
	brand: "",
	price: 1,
	discount: 0,
	countInStock: 1,
	category: {},
	tags: [],
	imageLink: "",
	slug: "",
	description: "",
};

const initialCategoryValues = {
	title: "",
	englishTitle: "",
	type: "",
	description: "",
};

function ProductsList() {
	const router = useRouter();
	const { isLoading, data: productsData } = useProductsList();
	const products = productsData?.products || [];
	const [show, setShow] = useState(false);
	const [showCat, setShowCat] = useState(false);
	const queryClient = useQueryClient();
	const { isLoading: submitLoading, mutateAsync } = useAddProduct();
	const { isLoading: submitCatLoading, mutateAsync: mutateCatAsync } =
		useAddCategory();
	const { mutateAsync: mutateDelAsync } = useDelProduct();

	const handleDelete = async (id) => {
		try {
			const { message } = await mutateDelAsync(id);
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["get-products"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const data =
		products.map((product) => ({
			key: product._id,
			id: product._id,
			title: product.title,
			price: product.offPrice,
			orgPrice: product.price,
			category: product.category.title,
			catId: product.category._id,
			tags: product.tags,
			brand: product.brand,
			createdAt: product.createdAt,
			image: product.imageLink,
			rate: product.rating,
			stock: product.countInStock,
		})) || [];

	const columns = [
		{
			title: "Title",
			width: 100,
			dataIndex: "title",
			key: "title",
			fixed: "left",
			render: (_, { title, key }) => {
				return (
					<Link
						href={{
							pathname: `/admin/products/${key}`,
							query: { title: `${title}` },
						}}
					>
						{title}
					</Link>
				);
			},
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			sorter: (a, b) => a.price - b.price,
			render: (_, { price }) => {
				return <>${price}</>;
			},
		},
		{
			title: "Image",
			width: 100,
			dataIndex: "image",
			key: "image",
			render: (_, { image }) => (
				<Avatar shape="square" src={image} size={64} />
			),
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "1",
			render: (_, { category, catId }) => {
				return (
					<Link href={`/admin/category/${catId}`}>
						<Tag>{category}</Tag>
					</Link>
				);
			},
		},
		{
			title: "Tags",
			dataIndex: "tags",
			key: "2",
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						return (
							<Tag color="#417499" key={tag}>
								#{tag}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: "Original Price",
			dataIndex: "orgPrice",
			key: "3",
			render: (_, { orgPrice }) => {
				return <>${orgPrice}</>;
			},
		},
		{
			title: "Brand",
			dataIndex: "brand",
			key: "4",
		},
		{
			title: "Created at",
			dataIndex: "createdAt",
			key: "5",
			render: (_, { createdAt }) => {
				const date = new Date(createdAt);
				const formattedDate = `${date.toLocaleDateString("en-US", {
					day: "numeric",
					month: "2-digit",
					year: "2-digit",
				})}`;
				return <>{formattedDate}</>;
			},
		},
		{
			title: "Rate",
			dataIndex: "rate",
			key: "6",
			sorter: (a, b) => a.rate - b.rate,
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "7",
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "8",
		},
		{
			title: "Action",
			key: "operation",
			render: (_, { key }) => (
				<Popconfirm
					title="Are you sure to delete?"
					onConfirm={() => handleDelete(key)}
					okType="danger"
					cancelText="No"
				>
					<Button danger size="small">
						DELETE
					</Button>
				</Popconfirm>
			),
		},
	];

	const handleAddProduct = async (data) => {
		try {
			const { message } = await mutateAsync(data);
			toast.success(message);
			setShow(false);
			queryClient.invalidateQueries({ queryKey: ["get-products"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleAddCategory = async (data) => {
		try {
			const { message } = await mutateCatAsync(data);
			toast.success(message);
			setShowCat(false);
			queryClient.invalidateQueries({ queryKey: ["get-categories"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	if (isLoading) {
		return (
			<Card className="m-2">
				<Skeleton loading={isLoading} active />
			</Card>
		);
	}

	return (
		<Card
			className="m-2"
			title="Product List"
			extra={
				<Space>
					<Button onClick={() => setShow((s) => !s)}>
						Add a product
					</Button>
					<Button onClick={() => setShowCat((s) => !s)}>
						Add a category
					</Button>
				</Space>
			}
		>
			<Modal
				title="Add a new product"
				open={show}
				onOk={() => setShow(false)}
				onCancel={() => setShow(false)}
				footer={[
					<Button danger key="back" onClick={() => setShow(false)}>
						Cancel
					</Button>,
				]}
			>
				<AddProductForm
					onSubmit={handleAddProduct}
					actionBtn="Add"
					initialFormValues={initialFormValues}
					submitLoading={submitLoading}
				/>
			</Modal>
			<Modal
				title="Add a new category"
				open={showCat}
				onOk={() => setShowCat(false)}
				onCancel={() => setShowCat(false)}
				footer={[
					<Button danger key="back" onClick={() => setShowCat(false)}>
						Cancel
					</Button>,
				]}
			>
				<AddCatForm
					onSubmit={handleAddCategory}
					actionBtn="Add"
					initialFormValues={initialCategoryValues}
					submitLoading={submitCatLoading}
				/>
			</Modal>

			<Table
				columns={columns}
				dataSource={data}
				scroll={{
					x: 1300,
				}}
			/>
		</Card>
	);
}

export default ProductsList;

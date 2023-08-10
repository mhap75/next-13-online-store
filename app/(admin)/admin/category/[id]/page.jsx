"use client";

import { useCategory, useEditCategory } from "@/hooks/useProducts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import AddCatForm from "../../products/AddCatForm";
import { toast } from "react-hot-toast";

function CategoryById({ params }) {
	const router = useRouter();
	const { data, isLoading } = useCategory(params.id);
	const { category } = data || {};
	const { isLoading: editCatLoading, mutateAsync } = useEditCategory();

	const { title, englishTitle, type, description } = category || {};

	const handleEditCategory = async (data) => {
		try {
			const { message } = await mutateAsync({
				id: params.id,
				data,
			});
			toast.success(message);
			router.push("admin/products");
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
			title={<span>Category ID: {params.id.toUpperCase()}</span>}
		>
			<AddCatForm
				onSubmit={handleEditCategory}
				actionBtn="Edit"
				initialFormValues={{ title, englishTitle, type, description }}
				submitLoading={editCatLoading}
			/>
		</Card>
	);
}

export default CategoryById;

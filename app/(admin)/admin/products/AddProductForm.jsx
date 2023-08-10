"use client";

import { useCategoriesList } from "@/hooks/useProducts";
import { getCatList } from "@/services/category";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, Select, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
const { TextArea } = Input;

function AddProductForm({
	actionBtn,
	initialFormValues,
	onSubmit,
	submitLoading,
}) {
	const router = useRouter();
	const { isLoading, data: categoryData } = useCategoriesList();
	const { categories } = categoryData?.data?.data || [];
	const options =
		(categories &&
			categories.map((cat) => ({
				value: cat._id,
				label: cat.title,
			}))) ||
		[];
	const [formVals, setFormVals] = useState(initialFormValues);

	const handleChange = ({ target }) => {
		const value = target.value;
		const name = target.name;
		if (name === "tags") {
			const newTags = value.split(",");
			setFormVals({ ...formVals, tags: newTags });
		} else {
			setFormVals({ ...formVals, [name]: value });
		}
	};

	const handleSubmit = () => {
		const {
			title,
			description,
			slug,
			tags,
			imageLink,
			brand,
			price,
			discount,
			countInStock,
			category,
		} = formVals;

		const offPrice = Math.floor((price * (100 - discount)) / 100);
		onSubmit({
			title,
			description,
			slug,
			tags,
			imageLink,
			brand,
			price,
			discount,
			offPrice,
			countInStock,
			category: category.value,
		});
	};

	return (
		<Card className="mb-2">
			<Form layout="horizontal" onFinish={handleSubmit}>
				<Form.Item label="Title">
					<Input
						name="title"
						value={formVals.title}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="Brand">
					<Input
						name="brand"
						value={formVals.brand}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="Slug">
					<Input
						name="slug"
						value={formVals.slug}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="Description">
					<TextArea
						name="description"
						onChange={handleChange}
						placeholder="write product description"
						rows={4}
						value={formVals.description}
					/>
				</Form.Item>
				<Form.Item label="Price">
					<InputNumber
						onChange={(v) => setFormVals({ ...formVals, price: v })}
						value={formVals.price}
						min={1}
						formatter={(value) =>
							`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						}
						parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
				<Form.Item label="Discount">
					<InputNumber
						onChange={(v) =>
							setFormVals({ ...formVals, discount: v })
						}
						min={0}
						formatter={(value) => `${value}%`}
						parser={(value) => value.replace("%", "")}
					/>
				</Form.Item>
				<Form.Item label="In stock">
					<InputNumber
						onChange={(v) =>
							setFormVals({ ...formVals, countInStock: v })
						}
						min={1}
						max={100}
						defaultValue={1}
					/>
				</Form.Item>
				<Form.Item label="Category">
					<Select
						allowClear
						style={{
							width: "100%",
						}}
						showSearch={false}
						placeholder="Please select"
						onChange={(v, l) =>
							setFormVals({
								...formVals,
								category: l,
							})
						}
						options={options}
						value={formVals.category.value}
					/>
				</Form.Item>
				<Form.Item label="Tags">
					<TextArea
						name="tags"
						onChange={handleChange}
						placeholder="tag1,tag2,..."
						rows={1}
						value={formVals.tags.join(",")}
					/>
				</Form.Item>
				<Form.Item label="Image link">
					<Input
						addonBefore="https://"
						name="imageLink"
						value={formVals.imageLink}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="Image" valuePropName="fileList">
					<Upload action="/upload.do" listType="picture-card">
						<div>
							<PlusOutlined />
							<div
								style={{
									marginTop: 8,
								}}
							>
								product image
							</div>
						</div>
					</Upload>
				</Form.Item>
				<Form.Item label="">
					<Button
						loading={submitLoading}
						htmlType="submit"
						className="w-20"
					>
						{actionBtn}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default AddProductForm;

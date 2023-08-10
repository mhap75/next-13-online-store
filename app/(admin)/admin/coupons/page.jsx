"use client";

import {
	useAddCoupon,
	useCouponsList,
	useDelCoupon,
	useProductsList,
} from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Card,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Popconfirm,
	Select,
	Skeleton,
	Table,
	Tag,
} from "antd";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CouponsList() {
	const { data: productsData } = useProductsList();
	const { data: couponsData, isLoading } = useCouponsList();
	const [show, setShow] = useState(false);
	const queryClient = useQueryClient();
	const { isLoading: addLoading, mutateAsync } = useAddCoupon();
	const { isLoading: remLoading, mutateAsync: mutateRemAsync } =
		useDelCoupon();
	const [formVals, setFormVals] = useState({
		type: "percent",
		code: "",
		amount: 1,
		usageLimit: 1,
		productIds: [],
		expireDate: "",
	});
	const coupons = couponsData?.coupons || [];
	const products = productsData?.products || [];
	const options =
		products.map((p) => ({
			value: p._id,
			label: `${p.title} - $${p.offPrice}`,
		})) || [];
	const data =
		coupons.map((c) => ({
			key: c._id,
			type: c.type,
			code: c.code,
			amount: c.amount,
			usageLimit: c.usageLimit,
			productIds: c.productIds,
			expireDate: c.expireDate,
		})) || [];

	const handleChange = ({ target }) => {
		const value = target.value;
		const name = target.name;
		setFormVals({ ...formVals, [name]: value });
	};

	const handleSelect = (v) => {
		setFormVals({ ...formVals, type: v });
	};

	const handleSelectProducts = (v) => {
		setFormVals({ ...formVals, productIds: v });
	};

	const handleSubmit = async () => {
		try {
			const { message } = await mutateAsync(formVals);
			toast.success(message);
			setShow(false);
			queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleDelete = async (id) => {
		try {
			const { message } = await mutateRemAsync(id);
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (_, { amount, type }) => {
				if (type === "percent") {
					return <>%{amount}</>;
				} else {
					return <>${amount}</>;
				}
			},
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			render: (_, { type }) => {
				if (type === "percent") {
					return <>Percent</>;
				} else {
					return <>Fixed</>;
				}
			},
		},
		{
			title: "Expires At",
			key: "expireDate",
			dataIndex: "expireDate",
			render: (_, { expireDate }) => {
				const pDate = new Date(expireDate);
				const formattedDate = `${pDate.toLocaleDateString("en-US", {
					day: "numeric",
					month: "2-digit",
					year: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})}`;
				return <>{formattedDate}</>;
			},
		},
		{
			title: "Products",
			key: "productIds",
			dataIndex: "productIds",
			className: "min-w-[260px]",
			render: (_, { productIds }) => {
				return productIds.map((product) => {
					return (
						<Link
							className="block"
							target="_blank"
							href={`/products/${product.slug}`}
							key={product._id}
						>
							<Tag>{product.title}</Tag>
						</Link>
					);
				});
			},
		},
		{
			title: "Action",
			key: "action",
			render: (_, { key }) => (
				<Popconfirm
					title="Are you sure to delete?"
					onConfirm={() => handleDelete(key)}
					okType="danger"
					cancelText="No"
					loading={remLoading}
				>
					<Button danger size="small">
						DELETE
					</Button>
				</Popconfirm>
			),
		},
	];

	const onChange = (value, _) => {
		const initialDate = new Date(value.$d);
		const year = initialDate.getUTCFullYear();
		const month = initialDate.getUTCMonth() + 1;
		const day = initialDate.getUTCDate();
		const hour = initialDate.getUTCHours();
		const minute = initialDate.getUTCMinutes();
		const second = initialDate.getUTCSeconds();
		const millisecond = initialDate.getUTCMilliseconds();

		const newDateString = `${year}-${month
			.toString()
			.padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour
			.toString()
			.padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second
			.toString()
			.padStart(2, "0")}.${millisecond.toString().padStart(3, "0")}Z`;
		setFormVals({ ...formVals, expireDate: newDateString });
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
			title="Coupons"
			extra={
				<Button onClick={() => setShow((s) => !s)}>Add a coupon</Button>
			}
		>
			<Modal
				title="Add a new coupon"
				open={show}
				onOk={() => setShow(false)}
				onCancel={() => setShow(false)}
				footer={[
					<Button danger key="back" onClick={() => setShow(false)}>
						Cancel
					</Button>,
				]}
			>
				<Form layout="horizontal" onFinish={handleSubmit}>
					<Form.Item label="Type">
						<Select
							placeholder="Please select"
							onChange={handleSelect}
							options={[
								{ label: "Percent", value: "percent" },
								{ label: "Fixed", value: "fixedProduct" },
							]}
							value={formVals.type}
						/>
					</Form.Item>
					<Form.Item label="Code">
						<Input
							name="code"
							value={formVals.code}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item label="Limit">
						<InputNumber
							value={formVals.usageLimit}
							min={1}
							onChange={(v) =>
								setFormVals({ ...formVals, usageLimit: v })
							}
						/>
					</Form.Item>
					<Form.Item label="Amount">
						<InputNumber
							value={formVals.amount}
							onChange={(v) =>
								setFormVals({ ...formVals, amount: v })
							}
							min={1}
						/>
					</Form.Item>
					<Form.Item label="Products">
						<Select
							mode="multiple"
							placeholder="Please select"
							onChange={handleSelectProducts}
							options={options}
							value={formVals.productIds}
							optionFilterProp="label"
						/>
					</Form.Item>
					<Form.Item label="Expiration date">
						<DatePicker showTime onChange={onChange} />
					</Form.Item>
					<Form.Item label="">
						<Button
							htmlType="submit"
							loading={addLoading}
							className="w-20"
						>
							Add
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Table
				scroll={{
					x: true,
				}}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		</Card>
	);
}

export default CouponsList;

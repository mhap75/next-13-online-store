"use client";

import { usePaymentsList } from "@/hooks/useProducts";
import { Button, Card, Skeleton, Table, Tag } from "antd";
import Link from "next/link";

function OrdersList() {
	const { data: paymentsData, isLoading } = usePaymentsList();
	const payments = paymentsData?.payments || [];
	console.log(payments);
	const data =
		payments.map((p) => ({
			key: p._id,
			invoiceNumber: p.invoiceNumber,
			amount: p.amount,
			status: p.status,
			method: p.paymentMethod,
			user: p.user.email,
			date: p.updatedAt,
			products: p.cart.productDetail,
		})) || [];

	const columns = [
		{
			title: "Invoice Number",
			dataIndex: "invoiceNumber",
			key: "invoiceNumber",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (_, { amount }) => {
				return <>${amount}</>;
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_, { status }) => {
				if (status) {
					return <Tag color="green">COMPLETED</Tag>;
				} else {
					<Tag color="magenta">PENDING</Tag>;
				}
			},
		},
		{
			title: "Date",
			key: "date",
			dataIndex: "date",
			render: (_, { date }) => {
				const pDate = new Date(date);
				const formattedDate = `${pDate.toLocaleDateString("en-US", {
					day: "numeric",
					month: "2-digit",
					year: "2-digit",
				})}`;
				return <>{formattedDate}</>;
			},
		},
		{
			title: "Method",
			dataIndex: "method",
			key: "method",
		},
		{
			title: "User",
			dataIndex: "user",
			key: "user",
		},
		{
			title: "Products",
			key: "products",
			dataIndex: "products",
			className: "min-w-[260px]",
			render: (_, { products }) => {
				return products.map((product) => {
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
	];

	if (isLoading)
		return (
			<Card className="m-2">
				<Skeleton loading active />
			</Card>
		);

	return (
		<Card className="m-2" title="Orders">
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

export default OrdersList;

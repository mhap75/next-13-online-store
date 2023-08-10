"use client";

import { usePersistUser } from "@/hooks/useAuth";
import { CheckOutlined } from "@ant-design/icons";
import { Card, Table, Tag } from "antd";
import Link from "next/link";

function Orders() {
	const { data: userData, isLoading } = usePersistUser();
	const { payments } = userData?.data?.data || {};

	const data =
		(payments &&
			payments.map((item) => {
				const date = new Date(item.createdAt);
				const formattedDate = `${date.toLocaleDateString("en-US", {
					day: "numeric",
					month: "2-digit",
					year: "2-digit",
				})}`;

				return {
					key: item._id,
					id: item._id.slice(0, 10).toUpperCase(),
					payment: "Credit Card",
					amount: `$${item.amount}`,
					description: item.cart.productDetail.map((p) => {
						return (
							<tr
								key={p._id}
							>
								<td>
									<Link href={`/products/${p.slug}`}>
										{p.title}
									</Link>
								</td>
								<td className="text-center">${p.offPrice}</td>
								<td className="text-center">{p.quantity}</td>
							</tr>
						);
					}),
					date: formattedDate,
					status: item.isPaid ? (
						<Tag color="green">{item.status}</Tag>
					) : (
						<Tag color="magenta">{item.status}</Tag>
					),
				};
			})) ||
		[];

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Payment",
			dataIndex: "payment",
			key: "payment",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		// {
		// 	title: "Action",
		// 	dataIndex: "",
		// 	key: "x",
		// 	render: () => <a>Delete</a>,
		// },
	];

	const expandedColumns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
		},
	];

	return (
		<Card className="m-2" title="Your Orders">
			<Table
				columns={columns}
				expandable={{
					expandedRowRender: (record) => (
						<table
							style={{
								margin: 0,
                            }}
						>
							<thead>
								<tr>
									<th className="!text-start">Title</th>
									<th>Price</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>{record.description}</tbody>
						</table>
					),
					rowExpandable: (record) => record.name !== "Not Expandable",
				}}
				dataSource={data}
				pagination={false}
			/>
		</Card>
	);
}

export default Orders;

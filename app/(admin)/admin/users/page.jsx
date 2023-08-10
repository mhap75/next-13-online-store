"use client";

import { useGetUsersList } from "@/hooks/useAuth";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Table, Tag } from "antd";
import Link from "next/link";

function Users() {
	const handleDeleteUser = (id) => {};
	const { data: userList, isLoading } = useGetUsersList();
	const data =
		userList?.data?.data?.users.map((user) => {
			return {
				key: user._id,
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
				role: [user.role],
				verification: user.isVerifiedPhoneNumber,
			};
		}) || [];

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (_, { name, key }) => (
				<Link href={`/admin/users/${key}`}>{name}</Link>
			),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Role",
			key: "role",
			dataIndex: "role",
			render: (_, { role }) => (
				<>
					{role.map((tag) => {
						let color = tag === "USER" ? "blue" : "geekblue";

						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: "Verification",
			dataIndex: "verification",
			key: "verification",
			render: (_, { verification }) => {
				if (verification) {
					return (
						<div className="flex justify-center text-base">
							<div className="bg-green-50 rounded-full w-fit px-1">
								<CheckCircleOutlined
									style={{ color: "green" }}
								/>
							</div>
						</div>
					);
				} else {
					return (
						<div className="text-center">
							<WarningOutlined style={{ color: "orange" }} />
						</div>
					);
				}
			},
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button
					size="small"
					onClick={() => handleDeleteUser(record.key)}
					danger
				>
					DELETE
				</Button>
			),
		},
	];

	if (!userList)
		return (
			<Card className="m-2">
				<Skeleton loading={isLoading} avatar active />
			</Card>
		);

	return (
		<Card className="m-2">
			<Table columns={columns} dataSource={data} pagination={false} />
		</Card>
	);
}

export default Users;

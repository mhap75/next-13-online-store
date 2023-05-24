"use client";

import MyInput from "@/components/common/Input";
import { usePersistUser } from "@/hooks/useAuth";
// import Spinner from "@/components/common/Spinner";

import { updateProfile } from "@/services/auth.";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Dashboard() {
	const { data, isLoading } = usePersistUser();
	const { user } = data?.data?.data || {};
	const [formVals, setFormVals] = useState({});
	const queryClient = useQueryClient();
	const { isLoading: formLoading, mutateAsync } = useMutation({
		mutationFn: updateProfile,
	});

	const handleChange = ({ target }) => {
		setFormVals({ ...formVals, [target.name]: target.value });
	};

	const sendSubmitData = async (e) => {
		e.preventDefault();
		const { name, email, biography } = formVals;

		try {
			const data = await mutateAsync({ name, email, biography });
            queryClient.invalidateQueries({queryKey: ["persist-user"]})
            toast.success(data.data.data.message);
		} catch (error) {
            toast.error(error?.response?.data?.message);
		}
	};

	useEffect(() => {
		user &&
			setFormVals({
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
				biography: user.biography || "",
			});
	}, [user]);

	if (isLoading) return <Skeleton active />;

	return (
		<Card className="m-2" title="Your information">
			<div>
				<Avatar
					className="bg-primary-200 mb-3"
					shape="square"
					size={64}
					src="../avatar.png"
				/>
			</div>
			<form
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
				onSubmit={sendSubmitData}
			>
				<MyInput
					rows={2}
					textarea
					className="col-span-full"
					label="Biography"
					name="biography"
					value={formVals.biography}
					onChange={handleChange}
				/>
				<MyInput
					placeholder="Your phone number"
					prefix={<PhoneOutlined />}
					label="Phone Number"
					name="phoneNumber"
					onChange={handleChange}
					value={formVals.phoneNumber}
					disabled
				/>
				<MyInput
					placeholder="Your phone number"
					prefix={<MailOutlined />}
					label="Email"
					name="email"
					onChange={handleChange}
					value={formVals.email}
				/>
				<MyInput
					placeholder="Your phone number"
					prefix={<UserOutlined />}
					label="Name"
					name="name"
					onChange={handleChange}
					value={formVals.name}
				/>
				<MyInput
					placeholder="example.com"
					label="Website"
					name="website"
					onChange={handleChange}
					value={formVals.website}
					addonBefore="https://"
				/>
				<MyInput
					rows={2}
					textarea
					className="col-span-full"
					label="Address"
					name="address"
					value={formVals.address}
					onChange={handleChange}
				/>
				{formLoading ? (
					"<Spinner />"
				) : (
					<Button htmlType="submit" className="col-span-full">
						Submit changes
					</Button>
				)}
			</form>
		</Card>
	);
}

export default Dashboard;

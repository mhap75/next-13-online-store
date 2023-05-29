"use client";

import { Button, Card, Checkbox } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import MyInput from "@/components/common/Input";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { compProfile } from "@/services/auth";

function CompleteProfile({ onChange, onSubmit }) {
	const [formVals, setFormVals] = useState({
		name: "",
		email: "",
		address: "",
		website: "",
		phoneNumber: "09923346976",
	});
	const { isLoading, mutateAsync } = useMutation({
		mutationFn: compProfile,
	});
	const router = useRouter();

	const sendSubmitData = async (e) => {
		e.preventDefault();
		const { name, email } = formVals;

		try {
			const data = await mutateAsync({ name, email });
			toast.success(data.data.data.message);
			router.push("/");
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleChange = ({ target }) => {
		setFormVals({ ...formVals, [target.name]: target.value });
	};

	return (
		<Card
			className="max-w-4xl !mx-auto !my-5"
			title="Sign up or log in"
			hoverable
			actions={[
				<Button
					loading={isLoading}
					htmlType="submit"
					className="bg-primary-500 w-[95%] mx-auto"
					type="primary"
					key="submit"
					onClick={sendSubmitData}
				>
					Submit changes
				</Button>,
			]}
		>
			<form
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
				onSubmit={sendSubmitData}
			>
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
			</form>
		</Card>
	);
}

export default CompleteProfile;

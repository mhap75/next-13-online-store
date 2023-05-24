"use client";

import { Button, Card, Checkbox } from "antd";
import {
	KeyOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MyInput from "@/components/common/Input";

function SendOtpForm({ onChange, phoneValue, onSubmit, loading }) {
	const sendSubmitData = (e) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<Card
			className="max-w-md !mx-auto !my-5"
			title="Sign up or log in"
			hoverable
		>
			<form className="flex flex-col gap-2" onSubmit={sendSubmitData}>
				{/* <label htmlFor="name">
						<h3 className="mb-1">Name</h3>
						<Input
							placeholder="First and family name"
							prefix={<UserOutlined />}
							id="name"
						/>
                    </label>
                    <label htmlFor="email">
						<h3 className="mb-1">Email</h3>
						<Input
							placeholder="Your email address"
							prefix={<MailOutlined />}
							id="email"
						/>
                    </label> */}
				<MyInput
					placeholder="Your phone number"
					prefix={<PhoneOutlined />}
					label="Phone Number"
					name="phoneNumber"
					onChange={onChange}
					value={phoneValue}
				/>
				{/* <label htmlFor="password">
						<h3 className="mb-1">Password</h3>
						<Input.Password
							id="password"
							prefix={<KeyOutlined />}
							placeholder="Your password"
						/>
					</label> */}

				{/* <Checkbox className="my-2">
						I agree with{" "}
						<Link className="text-blue-500" target="_blank" href="/">
							Terms and Conditions
						</Link>
					</Checkbox> */}
				<Button
					loading={loading}
					htmlType="submit"
					className="bg-primary-500"
					type="primary"
				>
					Send code
				</Button>
			</form>
		</Card>
	);
}

export default SendOtpForm;

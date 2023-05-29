"use client";

import { Button, Card } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import MyInput from "@/components/common/Input";

function 	SendOtpForm({ onChange, phoneValue, onSubmit, loading }) {

	return (
		<Card
			className="max-w-md !mx-auto !my-5"
			title="Sign up or log in"
			hoverable
		>
			<form className="flex flex-col gap-2" onSubmit={onSubmit}>
				<MyInput
					placeholder="Your phone number"
					prefix={<PhoneOutlined />}
					label="Phone Number"
					name="phoneNumber"
					onChange={onChange}
					value={phoneValue}
				/>
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

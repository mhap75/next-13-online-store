"use client";

import { RedoOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEffect, useState } from "react";

function CheckOtpForm({ onSubmit, loading, OTP, setOTP, onGoBack, time, onResend }) {
	const [isDisResend, setIsDisResend] = useState(true);

	const sendSubmitData = (e) => {
		e.preventDefault();
		onSubmit();
	};

	useEffect(() => {
		if (time < 1) {
			setIsDisResend(false);
		}
	}, [time]);

	return (
		<Card
			className="max-w-md !mx-auto !my-5"
			title="Verify phone number"
			hoverable
			extra={<Button onClick={onGoBack}>Go back</Button>}
		>
			<form className="flex flex-col gap-2" onSubmit={sendSubmitData}>
				<OTPInput
					value={OTP}
					onChange={setOTP}
					autoFocus
					OTPLength={6}
					otpType="number"
					disabled={false}
					inputClassName="min-w-[20px] rounded-md border border-primary-500 focus:outline-none"
					className="mx-auto"
				/>

				{time > 0 ? (
					<span>{time} seconds until resend</span>
				) : (
					<Button
						type="text"
						icon={<RedoOutlined />}
						size="small"
						disabled={isDisResend}
						onClick={() => {
							setIsDisResend(true);
							onResend();
						}}
					>
						resend
					</Button>
				)}

				<Button
					loading={loading}
					htmlType="submit"
					className="!bg-green-500 hover:!bg-green-400"
					type="primary"
				>
					Verify
				</Button>
			</form>
		</Card>
	);
}

export default CheckOtpForm;

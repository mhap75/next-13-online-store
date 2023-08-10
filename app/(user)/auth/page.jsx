"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/auth";
import { Button, Card, Input } from "antd";
import { PhoneOutlined, RedoOutlined } from "@ant-design/icons";
import MyInput from "@/components/common/Input";
import OTPInput from "react-otp-input";

function Auth() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [step, setStep] = useState(1);
	const [otp, setOtp] = useState("");
	const [time, setTime] = useState(0);
	const router = useRouter();

	const digitReg = new RegExp(
		"^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$"
	);

	const { isLoading, mutateAsync } = useMutation(getOtp);
	const { mutateAsync: mutateAsyncCheck, isLoading: isChecking } =
		useMutation(checkOtp);

	const handleValue = ({ target }) => {
		const { value } = target;
		const regex = /^[0-9\b]+$/;
		if (value === "" || regex.test(value)) {
			setPhoneNumber(value);
		}
	};

	const handlePhoneSubmit = async (e) => {
		e.preventDefault();
		// if (phoneNumber !== "" && digitReg.test(phoneNumber)) {
		// 	try {
		// 		const data = await mutateAsync(phoneNumber);
		// 		toast.success(data.data.data.message);
		// 		setStep("2");
		// 		setOTP("");
		// 		setTime(20);
		// 	} catch (error) {
		// 		toast.error(error?.response?.data?.message);
		// 	}
		// } else {
		// 	toast.error("Invalid phone number");
		// }
		setStep(2);
		setTime(20);
	};

	const handleCodeSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await mutateAsyncCheck({ phoneNumber, otp });
			toast.success(data.data.message);
			if (data.data.user.isActive) {
				router.push("/");
			} else {
				router.push("/complete-profile");
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleResend = async () => {
		try {
			const data = await mutateAsync(phoneNumber);
			toast.success(data.data.data.message);
			setOtp("");
			setTime(20);
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	useEffect(() => {
		const timer =
			time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [time]);

	return (
		<section>
			{step === 1 ? (
				<Card
					className="max-w-md !mx-auto !my-5"
					title="Sign up or log in"
					hoverable
				>
					<form
						className="flex flex-col gap-2"
						onSubmit={handlePhoneSubmit}
					>
						<MyInput
							placeholder="Your phone number"
							prefix={<PhoneOutlined />}
							label="Phone Number"
							name="phoneNumber"
							onChange={handleValue}
							value={phoneNumber}
						/>
						<Button
							loading={isLoading}
							htmlType="submit"
							className="bg-primary-500"
							type="primary"
						>
							Send code
						</Button>
					</form>
				</Card>
			) : (
				<Card
					className="max-w-md !mx-auto !my-5"
					title="Verify phone number"
					hoverable
					extra={<Button onClick={() => setStep(1)}>Go back</Button>}
				>
					<form
						className="flex flex-col gap-2"
						onSubmit={handleCodeSubmit}
					>
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderInput={(props) => <Input {...props} />}
							inputStyle={{
								minWidth: "20px",
								borderRadius: "5px",
								borderColor: "#058dc7",
								outline: "none",
								flex: 1,
							}}
							containerStyle={{
								justifyContent: "center",
								gap: "1rem",
							}}
						/>

						{time > 0 ? (
							<span>{time} seconds until resend</span>
						) : (
							<Button
								type="text"
								icon={<RedoOutlined />}
								size="small"
								onClick={() => handleCodeSubmit()}
							>
								resend
							</Button>
						)}

						<Button
							loading={isChecking}
							htmlType="submit"
							className="!bg-green-500 hover:!bg-green-400"
							type="primary"
						>
							Verify
						</Button>
					</form>
				</Card>
			)}
		</section>
	);
}

export default Auth;

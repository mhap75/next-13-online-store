"use client";

import { useEffect, useState } from "react";
import SendOtpForm from "./SendOtpForm";
import { toast } from "react-hot-toast";
import { checkOtp, getOtp } from "@/services/auth.";
import { useMutation } from "@tanstack/react-query";
import CheckOtpForm from "./CheckOtpForm";
import { useRouter } from 'next/navigation';

function Authentication() {
	const [phoneNumber, setPhoneNumber] = useState("09923346976");
	const [step, setStep] = useState(2);
	const [OTP, setOTP] = useState("");
	const [time, setTime] = useState(20);
	const router = useRouter()
	const { isLoading, mutateAsync } = useMutation({
		mutationFn: getOtp,
	});
	const { mutateAsync: mutateAsyncCheck, isLoading:isChecking } = useMutation({
		mutationFn: checkOtp,
	});
	const digitReg = new RegExp(
		"^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$"
	);

	const handleValue = ({ target }) => {
		const { value } = target;
		const regex = /^[0-9\b]+$/;
		if (value === "" || regex.test(value)) {
			setPhoneNumber(value);
		}
	};

	const handlePhoneSubmit = async () => {
		if (phoneNumber !== "" && digitReg.test(phoneNumber)) {
			try {
				const data = await mutateAsync(phoneNumber);
				toast.success(data.data.data.message);
				setStep(2);
				setOTP("")
				setTime(20)
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		} else {
			toast.error("Invalid phone number");
		}
	};

	const handleCodeSubmit = async () => {
		try {
			const {data} = await mutateAsyncCheck({ phoneNumber, otp: OTP });
			toast.success(data.data.message);
			if (data.data.user.isActive) {
				router.push("/")
			} else {
		 router.push("/complete-profile");
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
		// router.push("/complete-profile");
	};

	const handleResend = async () => {
		try {
			const data = await mutateAsync(phoneNumber);;
			toast.success(data.data.data.message);
			setOTP("")
			setTime(20)
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}

	const RenderStep = () => {
		switch (step) {
			case 1:
				return (
					<SendOtpForm
						onSubmit={handlePhoneSubmit}
						onChange={handleValue}
						phoneValue={phoneNumber}
						loading={isLoading}
					/>
				);
			case 2:
				return (
					<CheckOtpForm
						onSubmit={handleCodeSubmit}
						OTP={OTP}
						setOTP={setOTP}
						loading={isChecking}
						onGoBack={() => setStep((step) => step - 1)}
						time={time}
						onResend={handleResend}
					/>
				);
			case 3:
				return <p>Thank you</p>;

			default:
				return null;
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
			<RenderStep />
		</section>
	);
}

export default Authentication;

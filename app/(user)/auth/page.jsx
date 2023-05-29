"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
// import CheckOtpForm from "@/components/CheckOtpForm";
import SendOtpForm from "@/components/SendOtpForm";
import { checkOtp, getOtp } from "@/services/auth";


function Auth() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [step, setStep] = useState("1");
	const [OTP, setOTP] = useState("");
	const [time, setTime] = useState(20);
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
		if (phoneNumber !== "" && digitReg.test(phoneNumber)) {
			try {
				const data = await mutateAsync(phoneNumber);
				toast.success(data.data.data.message);
				setStep("2");
				setOTP("");
				setTime(20);
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		} else {
			toast.error("Invalid phone number");
		}
	};

	const handleCodeSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await mutateAsyncCheck({ phoneNumber, otp: OTP });
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
			setOTP("");
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

	const RenderStep = () => {
		if (step === "1") {
			return (
				<SendOtpForm
					onSubmit={handlePhoneSubmit}
					onChange={handleValue}
					phoneValue={phoneNumber}
					loading={isLoading}
				/>
			);
		}
		// else if (step === "2") {
		// 	return (
		// 		<CheckOtpForm
		// 			onSubmit={handleCodeSubmit}
		// 			OTP={OTP}
		// 			setOTP={setOTP}
		// 			loading={isChecking}
		// 			onGoBack={() => setStep((step) => step - 1)}
		// 			time={time}
		// 			onResend={handleResend}
		// 		/>
		// 	);
		// }
	};

	return (
		<section>
			<RenderStep />
		</section>
	);
}

export default Auth;

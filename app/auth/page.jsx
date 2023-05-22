"use client";

import { useState } from "react";
import SendOtpForm from "./SendOtpForm";
import { toast } from "react-hot-toast";
import http from "@/services/http";
import { getOtp } from "@/services/auth.";
import { useMutation } from "@tanstack/react-query";

function Authentication() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const { data, error, isLoading, mutateAsync } = useMutation({
		mutationFn: getOtp,
	});

	const handleValue = ({ target }) => {
		const { value } = target;
		const regex = /^[0-9\b]+$/;
		if (value === "" || regex.test(value)) {
			setPhoneNumber(value);
		}
	};

	const handleSubmit = async () => {
		const phoneReg = new RegExp(
			"^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$"
		);

		if (phoneNumber !== "" && phoneReg.test(phoneNumber)) {
			try {
				const data =await mutateAsync(phoneNumber)
				toast.success(data.data.data.message);
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		} else {
			toast.error("Invalid phone number");
		}
	};

	return (
		<section>
			<SendOtpForm
				onSubmit={handleSubmit}
				onChange={handleValue}
				phoneValue={phoneNumber}
				loading={isLoading}
			/>
		</section>
	);
}

export default Authentication;

"use client";

import { usePersistUser } from "@/hooks/useAuth";
import { addToCart, createPayment, remFromCart } from "@/services/product";
import { priceSeparator } from "@/utils/stringFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Input, Space, Table } from "antd";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Cart() {
	const { data: userData, isLoading } = usePersistUser();
	const { cart, user } = userData?.data?.data || {};
	const [coupon, setCoupon] = useState("");
	const data =
		cart?.productDetail
			.map((pro) => {
				return {
					key: pro._id,
					product: pro.title,
					price: `$${pro.offPrice}`,
					quantity: pro.quantity,
				};
			})
			.sort(function (a, b) {
				var keyA = a.key.toLowerCase();
				var keyB = b.key.toLowerCase();
				if (keyA < keyB) {
					return -1;
				}
				if (keyA > keyB) {
					return 1;
				}
				//* keys are equal
				return 0;
			}) || [];

	const { isLoading: remLoading, mutateAsync } = useMutation({
		mutationFn: remFromCart,
	});
	const { isLoading: addLoading, mutateAsync: mutateAddAsync } = useMutation({
		mutationFn: addToCart,
	});
	const { isLoading: crtPayLoading, mutateAsync: mutateCPAsync } =
		useMutation({
			mutationFn: createPayment,
		});
	const queryClient = useQueryClient();
	const handleRemFromCart = async (id) => {
		try {
			const { message } = await mutateAsync(id);
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["persist-user"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleAddToCart = async (id) => {
		try {
			const { message } = await mutateAddAsync(id);
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["persist-user"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleCreatePayment = async () => {
		try {
			const { message } = await mutateCPAsync();
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ["persist-user"] });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const checkQuantity = (id) => {
		const targetRow = cart.productDetail.filter((p) => p._id === id);
		if (targetRow[0].quantity > 1) {
			return true;
		} else {
			return false;
		}
	};

	const columns = [
		{
			title: "Product",
			dataIndex: "product",
			key: "product",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<div className="flex gap-2 items-center">
					<Button onClick={() => handleAddToCart(record.key)}>
						+
					</Button>
					<Button
						onClick={() => handleRemFromCart(record.key)}
						danger
					>
						{checkQuantity(record.key) ? "-" : "Delete"}
					</Button>
				</div>
			),
		},
	];

	if ((!user || !userData) && !isLoading) {
		return <Card className="m-2">Please Login first</Card>;
	} else if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<Card className="m-2">
			<Table
				footer={() => (
					<div className="flex items-center justify-between">
						<div className="flex gap-1">
							<span>
								Total: $
								{priceSeparator(cart?.payDetail?.totalPrice)}
							</span>
							<del className="text-red-400 text-xs">
								{cart?.payDetail?.totalGrossPrice}
							</del>
						</div>
						<Space.Compact>
							<Input
								value={coupon}
								onChange={({ target }) =>
									setCoupon(target.value)
								}
								placeholder="Enter your coupon"
							/>
							<Button>Apply coupon</Button>
						</Space.Compact>
						{/* <Link href="/cart/checkout"> */}
						<Button
							loading={crtPayLoading}
							onClick={handleCreatePayment}
						>
							Proceed to checkout
						</Button>
						{/* </Link> */}
					</div>
				)}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		</Card>
	);
}

export default Cart;

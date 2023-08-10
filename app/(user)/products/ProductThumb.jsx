"use client";

import { usePersistUser } from "@/hooks/useAuth";
import { addToCart, like } from "@/services/product";
import {
	EllipsisOutlined,
	HeartFilled,
	HeartOutlined,
	LoadingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, Tag, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const { Meta } = Card;

function ProductThumb({ product }) {
	const router = useRouter();
	const pathname = usePathname();
	const { data } = usePersistUser();
	const { user } = data?.data?.data || {};
	const offPercent =
		((product.price - product.offPrice) / product.price) * 100;
	const { isLoading, mutateAsync } = useMutation({
		mutationFn: addToCart,
	});

	const queryClient = useQueryClient();
	const handleAddToCart = async () => {
		if (!user) {
			toast.error("Please login first");
		} else if (isInCart(user, product)) {
			router.push(`/cart`);
		} else {
			try {
				const { message } = await mutateAsync(product._id);
				toast.success(message);
				queryClient.invalidateQueries({ queryKey: ["persist-user"] });
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		}
	};

	const isInCart = (user, product) => {
		if (!user) {
			return false;
		} else {
			return (
				user &&
				user.cart.products.some((p) => p.productId === product._id)
			);
		}
	};

	const handleLike = async () => {
		try {
			const { message } = await like(product._id);
			toast.success(message);
			router.refresh();
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<Badge.Ribbon
			className={`${offPercent === 0 ? "hidden" : ""}`}
			text={`sale`}
			color="magenta"
			placement="start"
		>
			<Card
				hoverable
				style={{
					minWidth: 150,
					maxWidth: "100%",
					minHeight: 250,
				}}
				cover={
					<Image
						alt={product.title}
						src={product.imageLink}
						width={100}
						height={56}
						className="object-contain h-52 pt-2"
					/>
				}
				actions={[
					<Tooltip
						title="Check the details"
						key="details"
						color="#003254"
					>
						<EllipsisOutlined
							onClick={() => {
								router.push(`/products/${product.slug}`);
							}}
						/>
					</Tooltip>,
					<Tooltip
						title={product.isLiked ? "Unlike" : "Like"}
						key="details"
						color="#003254"
					>
						{product.isLiked ? (
							<HeartFilled
								style={{ color: "red" }}
								onClick={handleLike}
							/>
						) : (
							<HeartOutlined onClick={handleLike} />
						)}
					</Tooltip>,
					<Tooltip
						title={
							isInCart(user, product)
								? "Continue purchase"
								: "Add to cart"
						}
						key="addToCart"
						color="#003254"
					>
						{isLoading ? (
							<LoadingOutlined className="!flex !items-center !justify-center mt-1" />
						) : (
							<ShoppingCartOutlined onClick={handleAddToCart} />
						)}
					</Tooltip>,
				]}
			>
				<Meta
					title={product.title}
					description={
						<div className="flex items-center justify-between">
							<div className="capitalize">{product.brand}</div>
							<Tag color="cyan">{product.category.title}</Tag>
						</div>
					}
				/>
				<div className="my-2 items-center flex gap-1">
					<span className="font-semibold text-lg text-primary-800">
						${product.offPrice}
					</span>
					{product.discount !== 0 && (
						<del className="text-red-400 text-xs">
							${product.price}
						</del>
					)}
				</div>
				{product.tags.map((tag) => (
					<Tag
						key={tag}
						className="text-xs"
						bordered={false}
						color="blue"
					>
						#{tag}
					</Tag>
				))}
			</Card>
		</Badge.Ribbon>
	);
}

export default ProductThumb;

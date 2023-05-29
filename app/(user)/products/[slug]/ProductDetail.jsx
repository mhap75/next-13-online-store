"use client";
import { usePersistUser } from "@/hooks/useAuth";
import { addToCart } from "@/services/product";
import HandleAddToCart from "@/utils/addToCart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Rate, Tag, Typography } from "antd";
import { Badge, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

const { Title } = Typography;

function ProductDetail({ product }) {
	const { data } = usePersistUser();
	const { user } = data?.data?.data || {};
	const { isLoading, mutateAsync } = useMutation({
		mutationFn: addToCart,
	});
	const queryClient = useQueryClient();

	const offPercent = Math.floor(
		((product.price - product.offPrice) / product.price) * 100
	);

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

	const handleAddToCart = async () => {
		if (!user) {
			toast.error("Please login first");
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

	return (
		<Card className="m-2">
			<div className="grid grid-cols-2">
				<Badge.Ribbon
					className={`${offPercent === 0 ? "hidden" : ""}`}
					text={`sale`}
					color="magenta"
					placement="start"
				>
					<Card className="w-fit">
						<Image
							src={product.imageLink}
							width={196}
							height={350}
							alt={product.title}
							className="object-contain w-96 h-96"
						/>
					</Card>
				</Badge.Ribbon>
				<div className="flex flex-col gap-2">
					<Title>{product.title}</Title>
					<Rate disabled defaultValue={product.rating} />
					<div className="flex gap-2 items-center justify-between mb-2">
						<h5 className="capitalize !text-primary-500 font-semibold">
							{product.brand}
						</h5>
						<div className="flex gap-2 items-center">
							{product.tags.map((tag, i) => (
								<Tag key={i} color="geekblue">
									#{tag}
								</Tag>
							))}
							<Link
								href={`/products?category=${product.category.englishTitle}`}
							>
								<Tag color="default">
									{product.category.title}
								</Tag>
							</Link>
						</div>
					</div>
					<div className="flex gap-1 items-start">
						<span className="font-bold text-xl text-primary-800">
							${product.offPrice}
						</span>
						{offPercent !== 0 && (
							<del className="text-red-400 text-xs">
								{product.price}
							</del>
						)}
					</div>
					<p>{product.description}</p>
					{isInCart(user, product) ? (
						<Link
							className="rounded-md px-1.5 py-1 bg-primary-100 bg-opacity-50 w-fit"
							href="/cart"
						>
							Continue purchase
						</Link>
					) : (
						<Button
							type="primary"
							className="mt-5 bg-primary-700"
							icon={<ShoppingCartOutlined />}
							onClick={handleAddToCart}
							loading={isLoading}
						>
							Add to cart
						</Button>
					)}
				</div>
			</div>
		</Card>
	);
}

export default ProductDetail;

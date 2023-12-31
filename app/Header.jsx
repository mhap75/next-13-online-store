"use client";

import { persistUser } from "@/services/auth";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Button, Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/next.svg"

const Header = () => {
	const navItems = [
		{ title: "Home", path: "/" },
		{ title: "Products", path: "/products" },
	];
	const { data, error, isLoading } = useQuery({
		queryKey: ["persist-user"],
		queryFn: persistUser,
		retry: false,
	});
	const { user, cart } = (data && data.data.data) || {};

	const items = [
		{
			label: (
				<p className="font-semibold">
					Hello {user && user.name.split(" ")[0]}!
					{user?.role === "ADMIN" && " (Admin)"}
				</p>
			),
			key: "0",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Badge>
					<Link href="/profile">Profile</Link>
				</Badge>
			),
			key: "1",
		},{
			label: (
				<Badge dot={cart?.productDetail.length}>
					<Link href="/cart">Cart</Link>
				</Badge>
			),
			key: "2",
		},
		{
			type: "divider",
		},
		{
			label: <button>Log out</button>,
			key: "3",
			danger: true,
		},
	];

	return (
		<header className="shadow-md bg-gradient-to-l from-sky-50 to-blue-400">
			<nav className="container flex justify-between items-center px-5 min-h-[65px]">
				<Link href="/">
					<Image
						className="align-middle"
						src={logo}
						height={50}
						width={120}
						alt="logo"
					/>
				</Link>
				<ul className="flex items-center gap-5">
					{navItems.map((navItem, i) => (
						<li key={i} className="rounded-lg">
							<Button className="text-primary-500" type="text">
								<Link href={navItem.path}>{navItem.title}</Link>
							</Button>
						</li>
					))}
					<li className="rounded-lg">
						{isLoading ? (
							<LoadingOutlined />
						) : user ? (
							<Dropdown
								menu={{
									items,
								}}
								trigger={["click"]}
							>
								<Avatar
									className="align-middle !bg-primary-400 cursor-pointer"
									size="large"
									gap={1}
								>
									{user.name
										.split(" ")
										.map((name) => name.charAt(0))
										.join("")}
								</Avatar>
							</Dropdown>
						) : (
							<Button className="text-primary-500" type="text">
								<Link href="/auth">Login / Register</Link>
							</Button>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

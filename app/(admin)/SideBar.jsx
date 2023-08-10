import { logout } from "@/services/auth";
import {
	AppstoreOutlined,
	CheckCircleOutlined,
	EuroCircleOutlined,
	GiftOutlined,
	HomeOutlined,
	InfoOutlined,
	MailOutlined,
	MoneyCollectOutlined,
	SafetyOutlined,
	SettingOutlined,
	ShopOutlined,
	SlidersOutlined,
	SmileOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Card, Menu, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../assets/next.svg";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items = [
	getItem("Admin Profile", "sub1", <UserOutlined />, [
		getItem(<Link href="/admin">Home</Link>, "1", <HomeOutlined />),
		getItem(
			<Link href="/admin/dashboard">Dashboard</Link>,
			"2",
			<SlidersOutlined />
		),
		getItem(
			<Link href="/admin/users">Users</Link>,
			"3",
			<UsergroupAddOutlined />
		),
		getItem(
			<Link href="/admin/orders">Orders</Link>,
			"4",
			<AppstoreOutlined />
		),
		getItem(
			<Link href="/admin/coupons">Coupons</Link>,
			"5",
			<GiftOutlined />
		),
		getItem(
			<Link href="/admin/products">Products</Link>,
			"6",
			<ShopOutlined />
		),
	]),
	getItem("Settings", "sub4", <SettingOutlined />, [
		getItem(
			<Link href="/admin/info">Your info</Link>,
			"9",
			<SmileOutlined />
		),
		getItem("Verification", "10", <CheckCircleOutlined />),
	]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub4", "sub5"];
const SideBar = () => {
	const [openKeys, setOpenKeys] = useState(["sub1"]);
	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const handleLogout = async () => {
		await logout();
		document.location.href = "/";
	};

	return (
		<Card
			className="m-2"
			title={
				<Link href="/">
					<Image src={logo} width={100} height={50} alt="logo" />
				</Link>
			}
			extra={
				<Tag
					icon={
						<SafetyOutlined
							style={{ color: "green", fontSize: "1rem" }}
						/>
					}
					color="success"
					bordered={false}
					className="flex"
				>
					Admin
				</Tag>
			}
		>
			<Menu
				mode="inline"
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				items={items}
			/>
			<Button
				className="w-full"
				danger
				type="text"
				onClick={handleLogout}
			>
				Logout
			</Button>
		</Card>
	);
};
export default SideBar;

import { logout } from "@/services/auth";
import {
	AppstoreOutlined,
	CheckCircleOutlined,
	EuroCircleOutlined,
	HomeOutlined,
	InfoOutlined,
	MailOutlined,
	MoneyCollectOutlined,
	SettingOutlined,
	SlidersOutlined,
	SmileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
	getItem("Profile", "sub1", <UserOutlined />, [
		getItem(<Link href="/profile">Home</Link>, "1", <HomeOutlined />),
		getItem(
			<Link href="/profile/dashboard">Dashboard</Link>,
			"2",
			<SlidersOutlined />
		),
		getItem(
			<Link href="/profile/products">Orders</Link>,
			"3",
			<AppstoreOutlined />
		),
		getItem("Billing", "4", <EuroCircleOutlined />),
		getItem("Messages", "5", <MailOutlined />),
	]),
	getItem("Settings", "sub4", <SettingOutlined />, [
		getItem(
			<Link href="/profile/info">Your info</Link>,
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
					<Image
						src="../next.svg"
						width={100}
						height={50}
						alt="logo"
					/>
				</Link>
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

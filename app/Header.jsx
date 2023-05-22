'use client'

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	const navItems = [
		{ title: "Home", path: "/" },
		{ title: "About", path: "/about" },
		{ title: "Login / Register", path: "/auth" },
	];

	return (
		<header className="shadow-md">
            <nav className="container flex justify-between items-center px-5 min-h-[65px]">
                <Link href='/'>
                    <Image className="align-middle" src="./next.svg" height={50} width={120} alt="logo" />
                </Link>
				<ul className="flex items-center gap-5">
					{navItems.map((navItem, i) => (
						<li key={i} className="rounded-lg">
							<Button className="text-blue-500" type="text">
								<Link href={navItem.path}>{navItem.title}</Link>
							</Button>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;

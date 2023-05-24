"use client";

import { usePersistUser } from "@/hooks/useAuth";
import { Card, Skeleton } from "antd";

function Profile() {
	const { data, isLoading } = usePersistUser();
	const { user } = data?.data?.data || {};
	const now = new Date().toLocaleString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	if (isLoading) return <Skeleton active />;
	return (
		<Card
			className="m-2"
			title={<p>Welcome {user.name}!</p>}
			extra={<small>{now}</small>}
		>
			<p>Main profile page</p>
		</Card>
	);
}

export default Profile;

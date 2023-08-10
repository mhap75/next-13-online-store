"use client";

import { SortAscendingOutlined } from "@ant-design/icons";
import { Card, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sortOptions = [
	{ label: "Default", value: "" },
	{ label: "Earliest", value: "oldest" },
	{ label: "Newest", value: "latest" },
	{ label: "Popularity", value: "popular" },
];

function SortProduct() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryString = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const currentSortParams = searchParams.getAll("sort")[0]?.split(",");

	const handleChange = (value) => {
		if (value !== "") {
			router.push(pathname + "?" + createQueryString("sort", value));
		} else {
			const current = new URLSearchParams(searchParams);
			current.delete("sort");
			router.push(pathname + "?" + current.toString());
		}
	};

	return (
		<Card className="m-2 col-span-4 lg:col-span-5">
			<div className="flex items-center gap-2">
				<div>
					<SortAscendingOutlined /> Sort by:
				</div>
				<Select
					className="min-w-[100px]"
					defaultValue={currentSortParams || ""}
					onChange={handleChange}
					options={sortOptions}
				/>
			</div>
		</Card>
	);
}

export default SortProduct;

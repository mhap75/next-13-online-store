"use client";

import { DownCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { Card, Tree } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function FilterProduct({ categories }) {
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
	const currentSearchParams = searchParams.getAll("category")[0]?.split(",");
	const filteredCats = categories.map((category) => {
		return {
			title: category.englishTitle,
			key: category.englishTitle,
		};
	});

	const treeData = [
		{
			title: "Categories",
			key: "0-0",
			checkable: false,
			children: [...filteredCats],
		},
		{
			title: "Brand",
			key: "0-1",
			checkable: false,
			children: [
				{ title: "Samsung", key: "0-1-0" },
				{ title: "Apple", key: "0-1-1" },
			],
		},
	];

	const onCheck = (checkedKeys, info) => {
		const data = info.checkedNodes
			.map((checked) => checked.title)
			.filter((cat) => cat !== "Categories");
		if (data.length) {
			router.push(pathname + "?" + createQueryString("category", data));
		} else {
			router.push(pathname);
		}
	};

	return (
		<div className="h-full md:row-span-2 md:col-span-3 lg:col-span-2 xl:col-span-1 relative">
			<Card title="Filter" className=" m-2 h-fit sticky top-5">
				<Tree
					checkable
					defaultCheckedKeys={currentSearchParams}
					selectable={false}
					onCheck={onCheck}
					treeData={treeData}
					defaultExpandAll={true}
					switcherIcon={<DownCircleFilled />}
				/>
			</Card>
		</div>
	);
}

export default FilterProduct;

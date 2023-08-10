import { getCatList } from "@/services/category";
import ProductList from "./ProductList";
import queryString from "query-string";
import { getProductList } from "@/services/product";
import { Suspense } from "react";
import FilterProduct from "./FilterProduct";
import SortProduct from "./SortProduct";
import { cookies } from "next/headers";
import { cookieToString } from "@/utils/cookieToString";
export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
	const cookieStore = cookies();
	const strCookies = cookieToString(cookieStore);
	const { categories } = await getCatList().then(({ data }) => data.data);
	const { products } = await getProductList(
		queryString.stringify(searchParams),
		strCookies
	);

	return (
		<section className="grid grid-cols-6 md:grid-rows-[min-content_minmax(300px,_1fr)]">
			<Suspense fallback={<p>Loading. . .</p>}>
				<FilterProduct categories={categories} />
			</Suspense>
			<SortProduct />
			<Suspense fallback={<p>Loading. . .</p>}>
				<ProductList products={products} />
			</Suspense>
		</section>
	);
}

export default Products;

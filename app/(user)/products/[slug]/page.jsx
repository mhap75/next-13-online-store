import { getProduct, getProductList } from "@/services/product";
import ProductDetail from "./ProductDetail";

export const dynamic = "force-static"; //? || SSG || {cache: "force-cache"}
export const dynamicParams = false;

async function Product({ params }) {
	const { slug } = params;
	const { product } = await getProduct(slug);
	console.log(product);
	return <ProductDetail product={product} />;
}

export default Product;

export async function getStaticParams() {
	const { products } = await getProductList();

	return products.map((product) => ({ slug: product.slug }));
}

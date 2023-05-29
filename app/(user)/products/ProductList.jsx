import ProductThumb from "./ProductThumb";

function ProductList({ products }) {
	return (
		<div className="m-2 grid md:col-span-3 lg:col-span-4 xl:col-span-5 md:grid-cols-2 xl:grid-cols-4 gap-4">
			{products &&
				products.map((product) => (
					<ProductThumb key={product._id} product={product} />
				))}
		</div>
	);
}

export default ProductList;

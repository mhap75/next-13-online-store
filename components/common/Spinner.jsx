import { TailSpin } from "react-loader-spinner";


function Spinner() {
	return (
		<TailSpin
			height="40"
			width="40"
			color="#058dc7"
			ariaLabel="tail-spin-loading"
			radius="1"
			wrapperClass="justify-center col-span-full"
			visible={true}
		/>
	);
}

export default Spinner;

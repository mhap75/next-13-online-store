"use client";

import { Input } from "antd";
import { useId } from "react";

function MyInput(props) {
	const id = useId();

	return (
		<label htmlFor={id + props.name}>
			<h3 className="mb-1">{props.label}</h3>
			<Input {...props} id={id + props.name} />
		</label>
	);
}

export default MyInput;

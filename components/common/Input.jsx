"use client";

import { Input } from "antd";
import { useId } from "react";

const { TextArea } = Input;

function MyInput(props) {
	const id = useId();

	return (
		<label htmlFor={id + props.name} className={props.className}>
			<h3 className="mb-1">{props.label}</h3>
			{props.textarea ? (
				<TextArea {...props} id={id + props.name} />
			) : (
				<Input {...props} id={id + props.name} />
			)}
		</label>
	);
}

export default MyInput;

"use client";

import { Button, Card, Form, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function AddCatForm({ actionBtn, initialFormValues, onSubmit, submitLoading }) {
	const [formVals, setFormVals] = useState(initialFormValues);

	const handleChange = ({ target }) => {
		const value = target.value;
		const name = target.name;

		setFormVals({ ...formVals, [name]: value });
	};

	const handleSubmit = () => {
		onSubmit(formVals);
		setFormVals(initialFormValues);
	};

	return (
		<Card className="mb-2">
			<Form layout="horizontal" onFinish={handleSubmit}>
				<Form.Item label="Title">
					<Input
						name="title"
						value={formVals.title}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="englishTitle">
					<Input
						name="englishTitle"
						value={formVals.englishTitle}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="type">
					<Input
						name="type"
						value={formVals.type}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item label="Description">
					<TextArea
						name="description"
						onChange={handleChange}
						placeholder="write product description"
						rows={4}
						value={formVals.description}
					/>
				</Form.Item>
				<Form.Item label="">
					<Button
						loading={submitLoading}
						htmlType="submit"
						className="w-20"
					>
						{actionBtn}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default AddCatForm;

import { useState, useEffect } from "react";
import axios from "axios";


const useForm = ( validate) => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = async  (e) => {
		e.preventDefault();

		setErrors(validate(values));
		setIsSubmitting(true);
		//console.log(values);
		const data = await axios
			.post("https://linglot.herokuapp.com/addUser", values)
			.then((response) => {
				console.log(response);
				

				return { response, isError: false };
			})
			.catch((error) => {
				console.log(error);
				return { response: error.response ?? error, isError: true };
			});

		return data;
	};


	return { handleChange, handleSubmit, values, errors };
};

export default useForm;

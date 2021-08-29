import React from "react";
import axios from 'axios';
import "./style.scss";
import loginImg from "../../login.svg";
import validate from "./validateInfo";
import LoginForm from "./loginform";
import GoogleLogin from "react-google-login";

const Login = (props) => {
	const { handleChange, handleSubmit, values, errors} = LoginForm(
		validate
	);
	let user={};

	const handleprevUsers=async ()=>{

		await axios.post("https://linglot.herokuapp.com/getPreviousUsers", user)
	   .then((response) => {
		   console.log(response.data);
		   
		   sessionStorage.setItem("prevUsers",JSON.stringify(response.data));
		
	   })
	   
	   .catch((error) => {
		   console.log(error);
		   
	   });
	
	}

	const handleLogin = async (e) => {
		e.preventDefault();

		const { response, isError } = await handleSubmit(e);

		if (isError) {
			console.log("[Login.jsx] Error!");
			if (response.status == 400) {
				console.log("User Not Found!");
				props.history.push("/error");
			} else {
				console.log(response.data ?? response);
			}
		} else {
			console.log("[Login.jsx] Request Successful");
			console.log(response.data);
			user=response.data;
			await sessionStorage.setItem('User',JSON.stringify(response.data));
			await sessionStorage.setItem("search","false");
			await handleprevUsers();
			props.history.push("/chatPage");
		}

		return false;
	};
	// const responseGoogle = (response) => {
	// 	console.log(response);
	// 	if(response.error!="popup_closed_by_user")
	// 	props.history.push("/validated");
		

	// };

	return (
		<div className="base-container">
			<div className="header">Login</div>
			<div className="content">
				<div className="image" style={{ width: "21em" }}>
					<img src={loginImg} />
				</div>
				<div className="form">
					<form onSubmit={handleLogin} noValidate>
						<div className="form-group">
							<label className="form-label">Email</label>
							<div className="input" style={{ marginBottom: "20px" }}>
								<input
									className="form-input"
									type="email"
									name="email"
									placeholder="Enter your email"
									value={values.email}
									onChange={handleChange}
								/>
								{errors.email && <p>{errors.email}</p>}
							</div>
						</div>
						<div className="form-group">
							<label className="form-label">Password</label>
							<div className="input" style={{ marginBottom: "20px" }}>
								<input
									className="form-input"
									type="password"
									name="password"
									placeholder="Enter your password"
									value={values.password}
									onChange={handleChange}
								/>
								{errors.password && <p>{errors.password}</p>}
							</div>
						</div>

						<div className="footer">
							<button
								type="submit"
								className="btn"
								style={{ height: "40px", width: "11.55rem" }}
							>
								Login
							</button>
							<div style={{ marginTop: "1rem", color: "blue" }}>Or</div>
						</div>
					</form>
					<GoogleLogin
						clientId="194700546147-m2c5gi7n12jhnth922ljnlgnm3qeag11.apps.googleusercontent.com"
						// onSuccess={responseGoogle}
						// onFailure={responseGoogle}
						cookiePolicy={"single_host_origin"}
						className="google_btn"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;

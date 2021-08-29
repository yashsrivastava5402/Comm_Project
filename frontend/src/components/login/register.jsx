import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './style.scss';
import loginImg from "../../login.svg";



const Register = (props) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    
    validate
  );

  const handleRegister = async (e) => {
		e.preventDefault();

		const { response, isError } = await handleSubmit(e);

		if (isError) {
			console.log("[Register.jsx] Error!");
			if (response.status == 400) {
				console.log("Register Failed!");
				props.history.push("/error");
			} 
      else if(response.status===300)
      {
        console.log("User Already Present");
        sessionStorage.setItem('User',JSON.stringify(response.data));
        props.history.push("/Regerror")
      }
      else {
				console.log(response.data ?? response);
			}
		} else {
			console.log("Register Request Successful");
			console.log(response.data);
      await sessionStorage.setItem('User',JSON.stringify(response.data));
			props.history.push("/validated");
		}

		return false;
	}

  return (
    <div className='base-container'>
    <div className="header">Register</div>
    <div className='content'>
    <div className="image" style={{width:'15em'}}>
            <img src={loginImg} />
    </div>
    <div className="form">
      <form onSubmit={handleRegister}  noValidate>
        <div className='form-group'>
          <label className='form-label'>Username</label>
          <div className='input'>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
          </div> 
        </div>
        <div className='form-group'>
          <label className='form-label'>Email</label>
          <div className="input">
           <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
           />
           {errors.email && <p>{errors.email}</p>}

          </div>
          
        </div>
        <div className='form-group'>
          <label className='form-label'>Password</label>
          <div className='input'>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          </div>
          
        </div>
        <div className='form-group'>
          <label className='form-label'>Confirm Password</label>
          <div className='input'>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}

          </div>
          
          
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
        
      </form>
    </div>
    </div>
       
    </div>
  );
};

export default Register;







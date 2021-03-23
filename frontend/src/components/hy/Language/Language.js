import React, { useState } from 'react';
import axios from 'axios';
import './Language.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import ReactLanguageSelect from 'react-languages-select';
 
//import css module
import 'react-languages-select/css/react-languages-select.css';
 
//OR import sass module
import 'react-languages-select/scss/react-languages-select.scss';
import { Dropdown } from 'semantic-ui-react';




const languageOptions  = [
    { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
    { key: 'Hindi', text: 'Hindi', value: 'Hindi' },
    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
    { key: 'Danish', text: 'Danish', value: 'Danish' },
    { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Greek', text: 'Greek', value: 'Greek' },
    { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
    { key: 'Italian', text: 'Italian', value: 'Italian' },
    { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
    { key: 'Korean', text: 'Korean', value: 'Korean' },
    { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
    { key: 'Persian', text: 'Persian', value: 'Persian' },
    { key: 'Polish', text: 'Polish', value: 'Polish' },
    { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
    { key: 'Russian', text: 'Russian', value: 'Russian' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
    { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
    { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
    { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
  ]



 const handleChange = () => {

 }




const Language = (props) => {



    
    const [values, setValues] = useState({
        Language: "",
        LearnLanguage: ""
      });
      const user=JSON.parse(sessionStorage.getItem("User"));

      


	const handlesearchuser=async ()=>{

		await axios.post("http://localhost:5000/getUsersList",user)
	   .then((response) => {
		   console.log(response.data);
		 if(response.data!==''){
		    sessionStorage.setItem("newuser",JSON.stringify(response.data));
		    sessionStorage.setItem("selecteduser",JSON.stringify(response.data));
            sessionStorage.setItem("search","true");
	
		 }  
	   })
	   
	   .catch((error) => {
		   console.log(error);
		   
	   });
		
	
	
	
	}
      
      

    const handleSubmit =async  (e) => {
        e.preventDefault();
        
        user.NativeLanguage=values.Language;
        user.LearningLanguage=values.LearnLanguage;
        sessionStorage.setItem("User",JSON.stringify(user));
        
       await axios
      .post("http://localhost:5000/addUserLanguage", user)
      .then((response) => {
          console.log(response.data);
           handlesearchuser();
          return { response, isError: false };
      })
      .catch((error) => {
          console.log(error);
          return { response: error.response ?? error, isError: true };
      });
    
      props.history.push("/chatPage");

    };
    
    const onChange = (event, result) => {
        const { name, value } = result || event.target;
        setValues({ ...values, [name]: value});
        console.log(values);
        
      };
   


    return (
        <div className="lang">
        
            <div className='lang__box'>
                <div className="lang__box-header">
                    <PersonOutlineRoundedIcon
                        fontSize='large'
                    />
                </div>
                <div className="lang__box-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form__group">
                        <label className='form__group-label'>Select your native language</label>
                     
                        <Dropdown
                            placeholder='Select Language'
                            fluid
                            search
                            selection
                            name="Language"
                            options={languageOptions}
                            value={values.Language}
                            onChange={onChange}
                            
                        />
                            
                        </div>
                        <div className="form__group">
                            <label className='form__group-label'>Select the language you want to learn</label>
                            <Dropdown
                            name="LearnLanguage"
                            placeholder='Select Language'
                            fluid
                            search
                            selection
                            options={languageOptions}
                            value={values.LearnLanguage}
                            onChange={onChange}
                            
                            />
                        </div>
                    </form>
                </div>
                <Button onClick={handleSubmit}variant="contained" color="primary">
                Submit
                </Button>
            </div>
        </div>
        
    )
}

export default Language;
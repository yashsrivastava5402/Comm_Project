import React,{useEffect} from "react";
import Lang from "../hy/Language/Language";
import Navy from "../hy/Navy/navbar";


const Validated = (props) => {
    
    useEffect(() => {
        console.log(sessionStorage.getItem('User'));
        if(sessionStorage.getItem('User')===null || sessionStorage.getItem('User')==='')
        props.history.replace("/login");
      
    }, [])

    return (
    <>
      <Navy />
      <Lang {...props} />
    </>
  );
};

export default Validated;

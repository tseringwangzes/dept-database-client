import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {registerfunction} from "../services/Apis";
import { NavLink,useNavigate} from "react-router-dom"
import registerStyle from "../styles/mix.module.css"

const Register = () => {

  const [passhow,setPassShow] = useState(false);

  const [inputdata,setInputdata] = useState({
    fname:"",
    email:"",
    password:""
  });

  const navigate = useNavigate();
  

  // setinputvalue
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})
  }


  // register data
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {fname,email,password} = inputdata;

    if(fname === ""){

      toast.error("Enter Your Name")

    }else if(email === ""){

      toast.error("Enter Your Email")

    }else if(!email.includes("@")){

      toast.error("Enter Valid Email")

    }else if(password === ""){

      toast.error("Enter Your Password")

    }else if(password.length < 6){

      toast.error("password length minimum 6 character")

    }else{

      const response = await registerfunction(inputdata);
      
      if(response.status === 200){

        setInputdata({...inputdata,fname:"",email:"",password:""});

        navigate("/")

      }else{
        
        toast.error(response.response.data.error);
      }
    }
  }


  return (
    <>
      <section className={registerStyle.page}>
        <div className={registerStyle.form_data}>
          <div className={registerStyle.form_heading}>
            <h1 className={registerStyle.heading}>Sign Up</h1>
            <p className = {registerStyle.para} style={{textAlign:"center"}}>We are glad that you will be using Project Cloud to manage
              your tasks! We hope that you will get like it.</p>
          </div>
          <form className={registerStyle.my_form}>
            <div className={registerStyle.form_input}>
              <label className={registerStyle.myLabel}htmlFor="fname">Name</label>
              <input className={registerStyle.myData} type="text" name="fname" id="" onChange={handleChange} placeholder='Enter Your Name' />
            </div>
            <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="email">Email</label>
              <input className = {registerStyle.myData} type="email" name="email" id=""  onChange={handleChange}  placeholder='Enter Your Email Address' />
            </div>
            <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="password">Password</label>
              <div className={registerStyle.two}>
              <input className = {registerStyle.myData} type={!passhow ? "password" : "text"} name="password" id=""  onChange={handleChange}  placeholder='Enter Your password' />
              <div className={registerStyle.showpass} onClick={()=>setPassShow(!passhow)} >
              {!passhow ? "Show" : "Hide"}
              </div>
              </div>
            </div>
            <button className={registerStyle.btn} onClick={handleSubmit}>Sign Up</button>
            <p className={registerStyle.para}>Already Registered? <NavLink to="/Login">Login</NavLink> </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Register
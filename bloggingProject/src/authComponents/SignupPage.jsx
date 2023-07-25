import '../css/SignupPage.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { validateName,validateEmail,validatePassword,validatePasswordConfirm } from '../js/validate';

const SignupPage = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = (e)=>{
        e.preventDefault();

        if(!validateName(name)){
            alert("Invalid Name");
            return;
        }
        if(!validateEmail){
            alert("Invalid Email");
            return;
        }
        if(!validatePassword(password)){
            alert("Password must be atleast 8 characters and must contain atleast one number and one special character");
            return;
        }
        if(!validatePasswordConfirm(password,confirmPassword)){
            alert("Passwords do not match");
            return;
        }
        const data = {
            name,
            email,
            password
        }

        axios.post("http://localhost:3000/signup",data)
        .then((res)=>{
            if(res.status === 200){
                navigate("/login");
            }
        })
        .catch((err)=>{
            alert("Registration Failed");
        }
        )

    }



    return (
        <>
            <div className="signup-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="bg-white shadow rounded">
                                <div className="row">
                                    <div className="col-md-7 pe-0">
                                        <div className="form-left h-100 py-5 px-5">
                                            <form onSubmit={handleRegister} className="row g-4">
                                                <div className="col-12">
                                                    <label className="text-dark">Name<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="text" onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Enter Name" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label className="text-dark">Email<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter Email" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label className="text-dark">Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" placeholder="Enter Password" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label className="text-dark">Confirm Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} className="form-control" placeholder="Confirm Password" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary px-4 float-end mt-4">Register</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ps-0 d-none d-md-block">
                                        <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                            <i className="bi bi-bootstrap"></i>
                                            <h2 className="fs-1">Welcome!</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupPage;
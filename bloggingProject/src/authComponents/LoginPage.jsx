import '../css/LoginPage.css'
import {validateEmail,validatePassword} from '../js/validate.js'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'


const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [check,setCheck] = useState(false);
    

    const navigate = useNavigate();

    const {state, login} = useContext(AuthContext);


    const handleLogin = (e)=>{
        e.preventDefault();
        
        if(!validateEmail(email)){
            alert("Invalid Email");
            return;
        }
        if(!validatePassword(password)){
            alert("Password must be atleast 8 characters and must contain atleast one number and one special character");
            return;
        }

        const data = {
            email:email,
            password:password,
            check:check
        }
        axios.post("http://localhost:3000/login",data)
        .then((res)=>{
            if(res.status === 200){
                login(res.data.token);
                navigate("/");
            }
            else{
                alert("Invalid Credentials");
            }
        }).catch((err)=>{
            alert(err);
        })

    }

    return (
        <>
            <div className="login-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="bg-white shadow rounded">
                                <div className="row">
                                    <div className="col-md-7 pe-0">
                                        <div className="form-left h-100 py-5 px-5">
                                            <form onSubmit={handleLogin} className="row g-4">
                                                <div className="col-12">
                                                    <label className="text-dark">Username<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter Username" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label className="text-dark" >Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" placeholder="Enter Password" required></input>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-check">
                                                        <input className="form-check-input" onChange={(e)=>{setCheck(e.target.checked)}} type="checkbox" id="inlineFormCheck"></input>
                                                        <label className="form-check-label text-dark" htmlFor="inlineFormCheck">Remember me</label>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <Link to="/reset-password" className="float-end text-primary">Forgot Password?</Link>
                                                </div>

                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary px-4 float-end mt-4">login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ps-0 d-none d-md-block">
                                        <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                            <h2 className="fs-1">Welcome back!</h2>
                                            
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

export default LoginPage;
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import '../css/ResetPassword.css'

const ResetPassword = () => {
    const [verified, setVerified] = useState(false); // this is used to show the otp field only when the otp is verified [otpVerified = true
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');


    const navigate = useNavigate();

    const sendEmail = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/generateOTP",{
            email: email
        })
        .then((res)=>{
            if(res.status === 200){
                setVerified(true);
                // make email field readonly
                document.getElementById("email-field").readOnly = true;
            }
            else{
                alert("Invalid Email");
            }
        })
        .catch((err)=>{
            alert(err);
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/verifyOTP",{
            email: email,
            otp: otp,
            password: password
        })
        .then((res)=>{
            if(res.status === 200){
                // redirect to login page
                alert("Password changed successfully");
                navigate("/login");
            }
            else{
                alert("Invalid OTP");
            }
        })
        .catch((err)=>{
            alert(err);
        }
        )
    }


    return (
        <>
            <div className="reset-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="bg-white shadow rounded">
                                <div className="row">
                                    <div className="col-md-7 pe-0">
                                        <div className="form-left h-100 py-5 px-5">
                                            <form className="row g-4">
                                                <div className="col-12">
                                                    <label className="text-dark">Email<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input id="email-field" type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Enter email to generate a otp" required></input>
                                                    </div>
                                                </div>

                                                {
                                                    verified &&
                                                    <div className="col-12">
                                                        <label className="text-dark">OTP<span className="text-danger">*</span></label>
                                                        <div className="input-group">
                                                            <input id="otp-field" type="text" onChange={(e) => { setOtp(e.target.value) }} className="form-control" placeholder="Enter OTP" required></input>
                                                        </div>
                                                    </div>

                                                }
                                                {
                                                    !verified && 
                                                    <div className="col-12">
                                                        <button onClick={(e)=>sendEmail(e)} className="btn btn-primary px-4 float-end mt-4">Generate OTP</button>
                                                    </div>
                                                }
                                                
                                                {
                                                    verified &&
                                                    <div className="col-12">
                                                    <label className="text-dark">Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input id="password-field" type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="Enter new Password" required></input>
                                                    </div>
                                                    </div>
                                                }
                                                {
                                                    verified && 
                                                    <div className="col-12">
                                                        <button onClick={(e)=>{handleSubmit(e)}} className="btn btn-primary px-4 float-end mt-4">Submit</button>
                                                    </div>
                                                }

                                                
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ps-0 d-none d-md-block">
                                        <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                            <h2 className="fs-1">RESET PASSWORD!</h2>

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

export default ResetPassword;
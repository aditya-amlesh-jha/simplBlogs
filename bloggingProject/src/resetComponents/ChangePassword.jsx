import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import '../css/ChangePassword.css'
import axios from 'axios';

const ChangePassword = () => {

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passVerified, setPassVerified] = useState(false);

    const { state } = useContext(AuthContext);
    const {token} = state;

    const navigate = useNavigate();

    const requestOTP = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3000/generateOTPForLoggedInUser",{},{
            headers: {
                Authorization:token,
            }
        })
        .then((res)=>{
            if(res.status === 200){
                setPassVerified(true);
            }
            else{
                alert("Not able to generate OTP");
            }
        })
        .catch((err)=>{
            alert(err);
        }
        )
    }


        


    const handleSubmit = (e)=>{
        e.preventDefault();
            axios.post("http://localhost:3000/verifyOTPForLoggedInUser",{
                password: newPassword,
                otp: otp
            },{
                headers: {
                    Authorization:token,
                }
            })
            .then((res)=>{
                if(res.status === 200){
                    alert("Password changed successfully");
                    navigate("/blogs");
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
            <div className="changepassword-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="bg-white shadow rounded">
                                <div className="row">
                                    <div className="col-md-7 pe-0">
                                        <div className="form-left h-100 py-5 px-5">
                                            <form className="row g-4">
                                                
                                                {
                                                    !passVerified &&
                                                    <div className="col-12 text-center">
                                                        <button onClick={(e)=>{requestOTP(e)}} className="btn btn-primary">Request OTP</button>
                                                    </div>
                                                }
                                                {
                                                    passVerified &&
                                                    <div className="col-12">
                                                        {/* messsage to check email */}
                                                        <p className="text-dark">OTP sent to your email</p>
                                                    </div>
                                                }

                                                {
                                                    passVerified &&
                                                    <div className="col-12">
                                                    <label className="text-dark" >OTP<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="text" onChange={(e)=>setOtp(e.target.value)} className="form-control" placeholder="Enter OTP" required></input>
                                                    </div>
                                                    </div>

                                                }
                                                {
                                                    passVerified &&
                                                    <div className="col-12">
                                                    <label className="text-dark" >New Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <input type="password" onChange={(e)=>setNewPassword(e.target.value)} className="form-control" placeholder="Enter Password" required></input>
                                                    </div>
                                                    </div>

                                                }
                                                {
                                                    passVerified &&
                                                    <div className="col-12">
                                                        <button onClick={(e)=>{handleSubmit(e)}}className="btn btn-primary px-4 float-end mt-4">Change Password</button>
                                                    </div>
                                                }
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ps-0 d-none d-md-block">
                                        <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                            <h2 className="fs-1">Reset Password</h2>
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

export default ChangePassword;
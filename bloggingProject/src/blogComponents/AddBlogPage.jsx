import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Editor from "./Editor";
import "../css/AddBlogPage.css"


const AddBlogPage = () => {

    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");

    console.log(image)

    const {state} = useContext(AuthContext);
    const {token} = state;

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const data = new FormData();
        data.append("title",title);
        data.append("body",body);
        data.append("image",image);
        
        axios.post("http://localhost:3000/create",data,{
            headers:{
                Authorization: token
        }})
        .then((res)=>{
            if(res.status === 200){
                navigate("/");
            }
            else{
                alert("Error in adding blog");
            }

        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <>
        <div className="addblog-page">
        <div className="addblog-body">
                <div className="mb-5">
                    <Editor 
                    handleSubmit={handleSubmit}
                    setBody={setBody}
                    setTitle={setTitle}
                    setImage={setImage}
                    defaultTitle={title}
                    defaultBody={body}
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default AddBlogPage;
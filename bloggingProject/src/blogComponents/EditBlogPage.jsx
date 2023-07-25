import { useParams,useNavigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../context/authContext";
import Editor from "./Editor";
import "../css/EditBlogPage.css"

const EditBlogPage = () => {

    const blog_id = useParams().id;

    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState(null);

    const {state} = useContext(AuthContext);
    const {token} = state;

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:3000/get/${blog_id}`)
        .then((res)=>{
            if(res.status === 200){
                setTitle(res.data.blog.title);
                setBody(res.data.blog.body);
            }
            else{
                alert("Error in fetching blog");
            }
        }).catch((err)=>{
            alert(err);
        })

    },[])


    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("title",title);
        data.append("body",body);
        data.append("image",image);
        
        axios.put(`http://localhost:3000/update/${blog_id}`,
        data,
        {
            headers:{
                Authorization: token
            }
        })
        .then((res)=>{
            if(res.status === 200){
                navigate("/blogs");
            }
            else{
                alert("Error in updating blog");
            }
        })
        .catch((err)=>{
            alert(err);
        })
    }

    return (
        <>
        <div className="editblog-page">
        <div className="editblog-body">
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
 
export default EditBlogPage;
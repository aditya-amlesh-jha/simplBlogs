import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import "../css/BlogList.css";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProtectedBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteAction, setDeleteAction] = useState(false);
  const [search, setSearch] = useState("");

  const { state } = useContext(AuthContext);
  const { token } = state;


  const trimString = (str, len) => {
    return str.length > len ? str.substring(0, len) + "..." : str;
  };

  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:3000/delete/${id}`, {
      headers: {
        Authorization: token,
      },
    }).then((res)=>{
      if(res.status === 200){
        setDeleteAction(!deleteAction);
      }
      else{
        alert("Error in deleting blog");
      }
    }
    ).catch((err)=>{
      alert(err);
    }
    )
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getByAuthor", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log("Error in fetching data");
      });
  }, [deleteAction]);


  useEffect(() => {
    axios
      .get(`http://localhost:3000/search?title=${search}`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log("Error in fetching data");
      });
  }, [search]);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const lastPostIndex = currentPage * blogsPerPage;
  const firstPostIndex = lastPostIndex - blogsPerPage;
  const currentBlogs = blogs.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="container-fluid">
        <div className="row m-0 p-2">
          <div className="col-lg-10 col-sm-12 main-blog-class mx-auto rounded">
            <div className="row justify-content-center rounded-top main-blog-search p-5 mb-4">
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={(e) => {setSearch(e.target.value)}}
                    aria-describedby="searchButton"
                  />
                </div>
              </div>
            </div>
            <div className="row m-0 mb-3">
              {currentBlogs &&
                currentBlogs.map((blog) => (
                  <div className="col-lg-4 col-md-6 my-2" key={blog._id}>
                    <div className="card img-thumbnail h-100 d-flex flex-column">
                    <div className="row">
                        <img src={blog.blogImage? `http://localhost:3000/${blog.blogImage}`:`https://source.unsplash.com/800x600/?${blog.title}`} alt="blog image" className="img-fluid"
                        style={{
                            height:"300px",
                            objectFit: "cover",
                            overflow: "hidden"
                        }} />
                    </div>

                      <div className="card-body">
                        <Link to={`/blogs/${blog._id}`}>
                          <h5 className="card-title text-dark">{blog.title}</h5>
                        </Link>
                        {/* Edit Button and Delete Button in same line */}
                        {/* make this row at bottom of card */}

                        
                      </div>
                      <div className="card-footer d-flex">
                      <div className="col-6 d-grid p-1">
                            <Link
                              to={`/edit-blog/${blog._id}`}
                              className="btn btn-outline-primary"
                            >
                              Edit
                            </Link>
                          </div>

                          <div className="col-6 d-grid p-1">
                            <button
                              onClick={()=>handleDelete(blog._id)}
                              className="btn btn-outline-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="row justify-content-center rounded-bottom main-blog-search">
              <Pagination
                totalPages={blogs.length}
                blogsPerPage={blogsPerPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedBlogList;

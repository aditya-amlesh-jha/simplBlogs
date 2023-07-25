import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import "../css/BlogList.css";

const BlogList = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const trimString = (str, len) => {
    return str.length > len ? str.substring(0, len) + "..." : str;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getall")
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log("Error in fetching data");
      });
  }, []);


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
            <div className="row m-0 mb-3 blog-grid">
              {currentBlogs &&
                currentBlogs.map((blog) => (
                  <div className="col-lg-4 col-md-6 my-2" key={blog._id}>
                    <div className="card img-thumbnail h-100 d-flex flex-column ">
                      <img
                        className="img-fluid m-1 border rounded border-dark image-property"
                        src={blog.blogImage? `http://localhost:3000/${blog.blogImage}`:`https://source.unsplash.com/100x50/`}
                        alt="Card image cap"
                      />

                      <div className="card-body">
                        <Link to={`/blogs/${blog._id}`}>
                          <h5 className="card-title text-dark">{trimString(blog.title,30)}</h5>
                        </Link>
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

export default BlogList;

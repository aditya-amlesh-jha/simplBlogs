import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser'
import "../css/BlogPage.css"

const BlogPage = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:3000/get/${id}`)
            .then((res) => {
                setBlog(res.data.blog);
                console.log(res.data.blog);
                // setAuthor(res.data.author);
            })
            .catch((err) => {
                console.log("Error in fetching data");
            });
    }, []);

    return (
        <>

            <div className="row m-0">

                <div className="col-lg-9 col-sm-10 blog-details mx-auto">
                    <div className="row rounded-top blog-title">
                        <h1 className="text-light my-4 text-center">
                            {blog.title}
                        </h1></div>
                        {/* image size fixed at 800*600 */}
                    <div className="row">
                        <img src={blog.blogImage? `http://localhost:3000/${blog.blogImage}`:`https://source.unsplash.com/800x600/?${blog.title}`} alt="blog image" className="img-fluid"
                        style={{
                            height:"600px",
                            objectFit: "cover",
                            overflow: "hidden"
                        }} />
                    </div>
                    <div className="py-3 px-4 mb-3 rounded-bottom blog-content">
                    {blog && blog.body && parse(blog.body)}
                    </div>
                </div>

            </div>
        </>
    );
};

export default BlogPage;

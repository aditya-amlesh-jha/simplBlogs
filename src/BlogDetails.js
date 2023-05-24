import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import useFetch from "./useFetch";

const BlogDetails = () => {

    // allows to grab paramteres from routes
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch("http://localhost:8000/blogs/" + id);
    const navigate = useNavigate();

    const handleClick = (e) => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: "DELETE"
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="blog-details">

            {isPending && <div>Loading..</div>}
            {error && <div>error</div>}
            {blog && (
                <article>
                    <Card className="mx-5 mt-5">
                        <Card.Body>
                            <Card.Title>{blog.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Author: {blog.author}
                            </Card.Subtitle>
                            <Card.Text>{blog.body}</Card.Text>
                            <Button variant="danger" onClick={handleClick}>Delete</Button>
                        </Card.Body>
                    </Card>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
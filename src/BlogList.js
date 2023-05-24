import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
const BlogList = (props) => {

    const blogs = props.blogs;

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength).trim() + '...';
    };

    return (
        <div>
                {blogs.map((blog) => (
                    <Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
                        <div className="mx-3 my-3" key={blog._id} >
                            <Card>
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Author: {blog.author}
                                    </Card.Subtitle>
                                    <Card.Text>{truncateText(blog.body, 400)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Link>
                ))}
            </div>
    );
}

export default BlogList;
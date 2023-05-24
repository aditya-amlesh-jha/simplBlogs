import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



// sfc
const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const blog = { title, body, author };
        console.log(blog);

        setIsPending(true);

        fetch('http://localhost:8000/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("New Blog Added");
            setIsPending(false);
            navigate("/");
        });
    }

    return (
        <div className="row m-0">
            <div className="col col-lg-6 col-md-8 col-sm-10 mx-auto mt-5">
                <h2 className="text-center mb-5">ADD A NEW BLOG</h2>
                <Form onSubmit={handleSubmit}>
                    <fieldset>
                        <Form.Group className="mb-3">
                            <Form.Label>Title </Form.Label>
                            <Form.Control type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Select required value={author} onChange={(e) => setAuthor(e.target.value)}>
                                <option value="">Select an author</option>
                                <option value="aditya">aditya</option>
                                <option value="neil">neil</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={5} required value={body} onChange={(e) => setBody(e.target.value)} />
                        </Form.Group>
                        {!isPending && <button type="submit" className="btn btn-primary">Add Blog</button>}
                        {isPending && <button disabled className="btn btn-primary">Adding Blog...</button>}
                    </fieldset>
                </Form>
            </div>
        </div>
    );


}

export default Create;

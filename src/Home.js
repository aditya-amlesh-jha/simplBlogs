import BlogList from "./BlogList";
import useFetch from "./useFetch";

// npx json-server --watch data/db.json --port 8000

// react router : switch between multiple pages
// while using react, we make contact to server only one
// server sends index.html and js.bundle
// npm install react-router-dom


const Home = () => {
  
  const {data: blogs ,isPending,error} = useFetch("http://localhost:8000");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All blogs!" />}
    </div>
  );
};

export default Home;
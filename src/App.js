import Home from './Home.js';
import Create from './Create.js';
import { BrowserRouter as Router,Route,Routes as Switch} from 'react-router-dom';
import BlogDetails from './BlogDetails.js';
import NotFound from './NotFound.js';
import NavigationBar from './NavigationBar.js';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
        <div className="content">
          <Switch>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/blogs/:id" element={<BlogDetails/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

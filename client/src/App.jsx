
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar, Footer } from "./components";
import { Auth, SinglePage, Home, Post, UpdatePost } from "./pages";

function App() {
  
  return (
    <div >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-post" element={<Post />} />
          <Route path="/single-page/:id" element={<SinglePage />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar, Footer } from "./components";
import { Auth, SinglePage, Home, Post } from "./pages";

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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App

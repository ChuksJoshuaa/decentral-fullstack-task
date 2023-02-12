import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";
import { Loader } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

  const getPosts = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${serverUrl}/api/v1/posts`)
        .then(function (response) {
          const data = response.data;
          setPostData(data.posts);
          setLoading(false);
        })
        .catch(function (error) {
          setError(true);

          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="mt-6 pt-3">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <h3 className="fs-2 font-weight-bold text-danger">
          Something went wrong, try again!!!
        </h3>
      </div>
    );
  }

  return (
    <div className="cover-container">
      {postData.length > 0 ? (
        <div className="container mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() =>
              (window.location.href = `${user ? "/create-post" : "/auth"}`)
            }
          >
            Create Post
          </button>

          <div className="row mt-3">
            {postData.map((item) => (
              <div className="col-sm-4" key={item._id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      style={{ height: "300px" }}
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <h5 className="card-title mt-2 text-danger">
                      {item.title}
                    </h5>
                    <p className="card-text">
                      {item.description.slice(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between">
                      <h6 className="text-primary">
                        Author: {item.authorName}
                      </h6>
                      <Link to={`single-page/${item._id}`}>
                        <button className="btn btn-primary">Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;

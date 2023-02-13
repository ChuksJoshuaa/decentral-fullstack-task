import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";
import { Loader } from "../components";
import * as api from "../api/index";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState({});
  const user = JSON.parse(localStorage.getItem("profile"));


  const getPost = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${serverUrl}/api/v1/posts/${id}`)
        .then(function (response) {
          const data = response.data;
          setPostData(data.post);
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


  const deletePostButton = async (id) => {
    try {
      await api.deletePost(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getPost();
  }, [id]);

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

  const checkData = Object.keys(postData).length;

  return (
    <div className="cover-container">
      {checkData > 0 ? (
        <div className="single-container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3></h3>
            <Link to="/" className="text-decoration-none">
              <button className="btn btn-secondary btn-lg">Go Back</button>
            </Link>
          </div>
          <div className="row">
            <div className="col-sm-12" key={postData._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <img
                    className="card-img-top"
                    style={{ height: "300px" }}
                    src={postData.imageUrl}
                    alt={postData.title}
                  />
                  <h5 className="card-title mt-2 text-danger">
                    {postData.title}
                  </h5>
                  <p className="card-text">{postData.description}...</p>
                  <div className="d-flex justify-content-between">
                    <h6 className="text-primary">
                      Author: {postData.authorName}
                    </h6>
                    {user?.data?.result?.id === postData.authorId && (
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mx-3 px-3 delete-btn"
                          onClick={() => deletePostButton(postData._id)}
                        >
                          Delete
                        </button>
                        <Link
                          className="text-decoration-none"
                          to={`/update-post/${postData._id}`}
                        >
                          <button className="btn btn-secondary btn-lg px-3 edit-btn">
                            Update
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SinglePage;

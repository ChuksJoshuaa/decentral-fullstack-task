import { useState, useEffect } from "react";
import { UpdateForm, Loader } from "../components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/serverUrl";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const CheckUser = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (!user) {
      navigate("/auth");
    }
  };

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
          setLoading(false);
          setError(true);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckUser();
  });

  useEffect(() => {
    if (id) {
      getPost();
    }
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
    <div>
      {checkData > 0 ? <UpdateForm post={postData} id={postData._id} /> : null}
    </div>
  );
};

export default UpdatePost;

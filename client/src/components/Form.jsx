import { useState } from "react";
import * as api from "../api/index";
import { useNavigate } from "react-router-dom";
import { Loader } from "./index";

const initialState = {
  title: "",
  description: "",
  imageUrl: "",
};

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      setErrors("This field is required");
      setTitleError(true);
      return;
    }

    if (formData.title) {
      setErrors("");
      setTitleError(false);
    }

    if (!formData.description) {
      setErrors("This field is required");
      setDescriptionError(true);
      return;
    }

    if (formData.description) {
      setErrors("");
      setDescriptionError(false);
    }

    if (!formData.imageUrl) {
      setErrors("This field is required");
      setImageError(true);
      return;
    }

    if (formData.imageUrl) {
      setErrors("");
      setImageError(false);
    }

    try {
      setLoading(true);
      await api.createPost(formData);
      setLoading(false);
      navigate("/");
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
      });

    } catch (error) {
      setLoading(false);
      setErrors("Something went wrong, try again");
      console.log(error);
    }


    setLoading(false);
    setErrors("");
  };

  const handleEnterKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="vh-100 mt-5 py-5 bg-white">
      <div
        className="single-form-container p-3"
        style={{ backgroundColor: "#fff" }}
      >
        <p className="text-danger text-center fw-bold fs-6 mb-2">{errors}</p>
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              style={{
                border: `${titleError ? "1px solid crimson" : ""}`,
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              style={{
                border: `${descriptionError ? "1px solid crimson" : ""}`,
              }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Paste image url "
              style={{
                border: `${imageError ? "1px solid crimson" : ""}`,
              }}
            />
          </div>

          <div className="pt-1 mb-4">
            <div className="d-flex">
              <button
                className="btn btn-dark btn-lg btn-block"
                type="button"
                onClick={handleSubmit}
                onKeyDown={handleEnterKeyPress}
              >
                Submit
              </button>
              {loading && (
                <div className="px-3">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

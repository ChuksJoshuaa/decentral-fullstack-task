import React, { useState } from "react";

const EditProjectForm = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [imageUrl, setImageUrl] = useState(post.imageUrl);
    

    const handleSubmit = () => {
        console.log(title)
    }

  return (
    <>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-secondary btn-sm edit-btn px-3"
          data-bs-toggle="modal"
          data-bs-target="#updatePostModal"
        >
          <span className="hide-btn">Update</span>
        </button>
      </div>

      <div
        className="modal fade"
        id="updatePostModal"
        tabIndex={1}
        aria-labelledby="updatePostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updatePostModalLabel">
                Edit Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image Url</label>
                  <input
                    type="text"
                    id="imageUrl"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectForm;

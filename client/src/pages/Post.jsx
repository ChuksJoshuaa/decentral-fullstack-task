import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components";

const Post = () => {
  const navigate = useNavigate();

  const CheckUser = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (!user) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    CheckUser();
  });
  return (
    <div>
      <Form />
    </div>
  );
};

export default Post;

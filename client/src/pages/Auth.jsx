import { useState } from "react";
import { imageLogo } from "../utils/image";
import { useNavigate } from "react-router-dom";
import * as api from "../api/index";
import { Loader } from "../components";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState("");
  const [authError, setAuthError] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const errorCheck = () => {
    setErrors("");
    setLoading(false);
    setAuthError(false)
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setRepeatPasswordError(false);
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    errorCheck();
    setFormData(initialState)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    errorCheck();

    if (isSignup) {
      if (!formData.username) {
        setErrors("This field is required");
        setUsernameError(true);
        return;
      }

      if (formData.username) {
        setErrors("");
        setUsernameError(false);
      }

      if (!formData.email) {
        setErrors("Please enter your email");
        setEmailError(true);
        return;
      }
      if (
        formData.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ) === null
      ) {
        setErrors("Please enter a valid email");
        setEmailError(true);
        return;
      }

      if (formData.email) {
        setErrors("");
        setEmailError(false);
      }

      if (!formData.password) {
        setErrors("This field is required");
        setPasswordError(true);
        return;
      }

      if (formData.password) {
        setErrors("");
        setPasswordError(false);
      }

      if (!formData.repeatPassword) {
        setErrors("This field is required");
        setRepeatPasswordError(true);
        return;
      }

      if (formData.repeatPassword) {
        setErrors("");
        setRepeatPasswordError(false);
      }

      if (formData.password !== formData.repeatPassword) {
        setErrors("Password does not match");
        setRepeatPasswordError(true);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.signUp(formData);
        localStorage.setItem("profile", JSON.stringify({ data }));
        setLoading(false);
        navigate("/");
        setFormData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
      } catch (error) {
        setLoading(false);
        setAuthError(true);
        console.log(error);
      }
    } else {
      if (!formData.email) {
        setErrors("Please enter your email");
        setEmailError(true);
        return;
      }
      if (
        formData.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ) === null
      ) {
        setErrors("Please enter a valid email");
        setEmailError(true);
        return;
      }

      if (formData.email) {
        setErrors("");
        setEmailError(false);
      }

      if (!formData.password) {
        setErrors("This field is required");
        setPasswordError(true);
        return;
      }

      if (formData.password) {
        setErrors("");
        setPasswordError(false);
      }

      try {
        setLoading(true);
        const { data } = await api.signIn(formData);
        localStorage.setItem("profile", JSON.stringify({ data }));
        setLoading(false);
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        setLoading(false);
        setAuthError(true);
        console.log(error);
      }
    }

    setErrors("");
    setLoading(false);
  };

  const handleEnterKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="vh-100 bg-light">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imageLogo}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img
                          src={imageLogo}
                          alt="login form"
                          height="50px"
                          width="50px"
                        />
                        <span
                          className="h1 fw-medium mb-0"
                          style={{ fontFamily: "Lobster Two" }}
                        >
                          Decentral
                        </span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3">
                        {!isSignup
                          ? "Sign into your account"
                          : "Create a new account"}
                      </h5>

                      <p className="text-danger text-center fw-bold fs-4">
                        {errors}
                      </p>

                      {authError ? (
                        <p className="text-danger text-center fw-bold fs-4">
                          {!isSignup ? 'Authentication error: Invalid email or password': 'Authentication error, Try again!!'}
                        </p>
                      ) : null}

                      {isSignup && (
                        <div className="form-outline mb-4">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            style={{
                              border: `${
                                usernameError ? "1px solid crimson" : ""
                              }`,
                            }}
                          />
                        </div>
                      )}

                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          style={{
                            border: `${emailError ? "1px solid crimson" : ""}`,
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          style={{
                            border: `${
                              passwordError ? "1px solid crimson" : ""
                            }`,
                          }}
                        />
                      </div>

                      {isSignup && (
                        <div className="form-outline mb-4">
                          <label className="form-label">Re-Password</label>
                          <input
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            style={{
                              border: `${
                                repeatPasswordError ? "1px solid crimson" : ""
                              }`,
                            }}
                          />
                        </div>
                      )}

                      <div className="pt-1 mb-4">
                        <div className="d-flex">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleSubmit}
                            onKeyDown={handleEnterKeyPress}
                          >
                            {!isSignup ? "Login" : "Register"}
                          </button>
                          {loading && (
                            <div className="px-3">
                              <Loader />
                            </div>
                          )}
                        </div>
                      </div>
                      <p
                        className="mb-5 pb-lg-2"
                        style={{ color: "#393f81" }}
                        onClick={switchMode}
                      >
                        {!isSignup
                          ? "Don't have an account?"
                          : "Already have an account"}{" "}
                        <a href="#!" style={{ color: "#393f81" }}>
                          {!isSignup ? "Register here" : "Login here"}
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

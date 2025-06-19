import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const initialValues = { userName: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Please Enter Your userName";
    }
    if (!values.password) {
      errors.password = "Please Enter Your password";
    }
    return errors;
  };

  const onSubmitSuccess = (jwt, userName) => {
    Cookies.set("Jwt_Token", jwt, { expires: 30 });
    localStorage.setItem("userName", userName);
    navigate("/");
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const finalData = {
        userName: formValues.userName,
        password: formValues.password,
      };

      setLoading(true); // Start loader

      fetch(process.env.REACT_APP_LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setLoading(false); // Stop loader

          if (res.ok === true) {
            onSubmitSuccess(data.jwtToken, data.userName);
          } else {
            console.log("Login Failed:", data.error_msg);
            alert("Login Failed: " + (data.error_msg || "Unknown error"));
          }
        })
        .catch((err) => {
          setLoading(false); // Stop loader
          console.error("Fetch error:", err);
          alert("Server error. Please try again later.");
        });
    }
  }, [formErrors]);

  return (
    <div className="hp-container">
      {loading ? (
        <div className="loader-container">
          <BeatLoader color="#36d7b7" size={15} />
          <p className="loginLoader">Logging in, please wait...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="input-field"
              id="username"
              value={formValues.userName}
              name="userName"
              onChange={handleChange}
            />
            <p>{formErrors.userName}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              type="password"
              id="password"
              value={formValues.password}
              name="password"
              onChange={handleChange}
            />
            <p>{formErrors.password}</p>
          </div>
          <button className="login-button" type="submit">Login</button>
          <p className="bottom">Please SignUp <Link to='/register'>Here</Link> if you are new</p>
        </form>
      )}
    </div>
  );
};

export default Login;

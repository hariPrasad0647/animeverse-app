import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import './index.css';

const initialValues = { name: "", userName: "", password: "", password2: "" };

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState(""); // for backend messages
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false); // loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError(""); // clear backend errors
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Please Enter Your Name";
    if (!values.userName) errors.userName = "Please Enter Your Username";
    if (!values.password) errors.password = "Please Enter Your Password";
    if (!values.password2) errors.password2 = "Please Re-Enter Your Password";
    if (values.password && values.password2 && values.password !== values.password2) {
      errors.passwordMatch = "Passwords do not match";
    }
    return errors;
  };

  useEffect(() => {
    const submitData = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const finalData = {
          name: formValues.name,
          userName: formValues.userName,
          password: formValues.password,
        };

        try {
          setLoading(true); // start loader
          const response = await fetch(process.env.REACT_APP_SIGNUP_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          });

          const data = await response.json();
          setLoading(false); // stop loader

          if (!response.ok) {
            setServerError(data); // backend returns plain string
          } else {
            setServerError("User Created Successfully ✅");
            setFormValues(initialValues);
            setIsSubmit(false);
          }
        } catch (error) {
          setLoading(false);
          setServerError("Something went wrong. Please try again.");
        }
      }
    };

    submitData();
  }, [
  formErrors,
  isSubmit,
  formValues.name,
  formValues.userName,
  formValues.password,
]);

  return (
    <div className='hp-container'>
      {loading ? (
        <div className="loader-container">
          <BeatLoader color="#36d7b7" />
          <p className="creating" style={{  }}>Creating account...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Sign Up</h1>

          <div className="label-input">
            <label htmlFor="name">Enter your Name</label>
            <input
              className="input-field"
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p className={`form-error ${formErrors.name ? "show" : ""}`}>{formErrors.name}</p>
          </div>

          <div className="label-input">
            <label htmlFor="username">Username</label>
            <input
              className="input-field"
              type="text"
              id="username"
              name="userName"
              value={formValues.userName}
              onChange={handleChange}
            />
            <p className={`form-error ${formErrors.userName ? "show" : ""}`}>{formErrors.userName}</p>
          </div>

          <div className="label-input">
            <label htmlFor="password">Create Password</label>
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className={`form-error ${formErrors.password ? "show" : ""}`}>{formErrors.password}</p>
          </div>

          <div className="label-input">
            <label htmlFor="password2">Enter Password Again</label>
            <input
              className="input-field"
              type="password"
              id="password2"
              name="password2"
              value={formValues.password2}
              onChange={handleChange}
            />
            <p className={`form-error ${formErrors.password2 ? "show" : ""}`}>{formErrors.password2}</p>
          </div>

          {/* Password match error */}
          {formErrors.passwordMatch && (
            <p className="form-error show">{formErrors.passwordMatch}</p>
          )}

          <button className="signup-button" type="submit">Sign Up</button>

          {/* Backend response */}
          {serverError && (
            <p style={{ marginTop: "10px", color: serverError.includes("Successfully") ? "green" : "red" }}>
              {serverError} {serverError.includes("Successfully") && <Link to="/login" className="login-route">Go to Login</Link>}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default SignUpForm;

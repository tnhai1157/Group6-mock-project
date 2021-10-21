import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../../../SignIn/redux/actions";
import { getUserSignUp } from "../../redux/actions";

function FormSignUp(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user.data.user);
  const [error, setError] = useState();

  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, email, password } = props.values;

    dispatch(
      getUserSignUp.getUserSignUpRequest({
        username: username,
        email: email,
        password: password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        {error &&
          Object.keys(error).map((obj, i) => {
            return (
              <div>
                <p className="error-messages">
                  {obj} {error[obj]}
                </p>
              </div>
            );
          })}
        <p className="error-messages">{props.errors.username}</p>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Username"
          name="username"
          value={props.values.username}
          onChange={props.handleChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <p className="error-messages">{props.errors.email}</p>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Email"
          name="email"
          value={props.values.email}
          onChange={props.handleChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <p className="error-messages">{props.errors.password}</p>
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          name="password"
          value={props.values.password}
          onChange={props.handleChange}
        />
      </fieldset>
      <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
    </form>
  );
}

const FormikFormSignUp = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    username: Yup.string().required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Please provide a valid password"),
  }),
} as any)(FormSignUp);

export default FormikFormSignUp;

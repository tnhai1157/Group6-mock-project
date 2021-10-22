import React, { SyntheticEvent, useEffect, useState } from "react";
import { withFormik, InjectedFormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUserSignUp } from "../../apis";
import { saveUserInStore } from "../../../../redux/actions";
import { FormProps, FormValues } from "./interface";

function FormSignUp(props: InjectedFormikProps<FormProps, FormValues>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { username, email, password } = props.values;

    postUserSignUp({ username, email, password })
      .then((res) => {
        const user = res.data.user;
        dispatch(saveUserInStore.saveUserInStoreSuccess(user));
        window.localStorage.setItem("jwtToken", user.token);
        history.push("/");
      })
      .catch((e) => {
        const errorObject = { ...e.response.data.errors };
        setError(errorObject);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        {error &&
          Object.keys(error).map((obj, i) => {
            return (
              <div key={i}>
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
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        disabled={!props.isValid || !props.values.email}
      >
        Sign up
      </button>
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
  handleSubmit: () => {},
})(FormSignUp);

export default FormikFormSignUp;

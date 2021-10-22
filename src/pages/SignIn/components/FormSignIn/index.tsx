import React, { SyntheticEvent, useState } from "react";
import { withFormik, InjectedFormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUsersSignIn } from "../../apis";
import { saveUserInStore } from "../../../../redux/actions";
import { FormProps, FormValues } from "./interface";

function FormLogin(props: InjectedFormikProps<FormProps, FormValues>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = props.values;
    postUsersSignIn({ email, password })
      .then((res) => {
        const user = res.data.user;
        history.push("/");
        dispatch(saveUserInStore.saveUserInStoreSuccess({ user }));
        window.localStorage.setItem("jwtToken", user.token);
      })
      .catch((e) => setError(true));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <p className="error-messages">
          {error && "Email or password is invalid"}
        </p>
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
        Sign in
      </button>
    </form>
  );
}

const FormikFormLogin = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Please provide a valid password"),
  }),
  handleSubmit: () => {},
})(FormLogin);

export default FormikFormLogin;

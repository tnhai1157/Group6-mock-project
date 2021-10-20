import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../../redux/actions";

function FormLogin(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user.data.user);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = props.values;
    dispatch(
      getUser.getUserRequest({
        email: email,
        password: password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <p className="error-messages">{error}</p>
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
      <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
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
} as any)(FormLogin);

export default FormikFormLogin;

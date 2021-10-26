import { withFormik, InjectedFormikProps } from "formik";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
// import { RootState } from "../../../..";
import { saveUserInStore } from "../../../../redux/actions";
import { updateUser } from "../../apis";
import { FormValues, FormProps } from "./interface";

function FormSettings(props: InjectedFormikProps<FormProps, FormValues>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user.data);
  const { setFieldValue } = props;

  useEffect(() => {
    setFieldValue("imageURL", user.image);
    setFieldValue("username", user.username);
    setFieldValue("bio", user.bio);
    setFieldValue("email", user.email);
  }, [user, setFieldValue]);

  const [error, setError] = useState();
  const token = window.localStorage.getItem("jwtToken");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { imageURL, bio, username, email, password } = props.values;

    updateUser({ imageURL, bio, username, email, password }, token)
      .then((res) => {
        const user = res.data.user;
        dispatch(saveUserInStore.saveUserInStoreSuccess(user));
        history.push(`/profile/${user.username}`);
      })
      .catch((e) => {
        const errorObject = { ...e.response.data.errors };
        setError(errorObject);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <ul className="form-group">
          {error &&
            Object.keys(error).map((obj, i) => {
              return (
                <li key={i}>
                  <p className="error-messages">
                    {obj} {error[obj]}
                  </p>
                </li>
              );
            })}
        </ul>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            name="imageURL"
            value={props.values.imageURL}
            onChange={props.handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
          {/* <p className="error-messages">{props.errors.username}</p> */}

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
          <textarea
            className="form-control form-control-lg"
            placeholder="Short bio about you"
            rows={6}
            name="bio"
            value={props.values.bio}
            onChange={props.handleChange}
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          {/* <p className="error-messages">{props.errors.email}</p> */}
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
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={props.values.password}
            onChange={props.handleChange}
          />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">
          Update Settings
        </button>
      </fieldset>
    </form>
  );
}

const FormikFormSettings = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      imageURL: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    username: Yup.string().required("Username is required"),
    email: Yup.string().email().required("Email is required"),
  }),
  handleSubmit: () => {},
})(FormSettings);

export default FormikFormSettings;

import { withFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import * as actions from "../../redux/actions";

function FormSettings(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user.data.user);
  const [error, setError] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(props.values);
    const { imageURL, bio, username, email, password } = props.values;

    dispatch(
      actions.updateUser.updateUserRequest({
        imageURL,
        bio,
        username,
        email,
        password,
        token: user.token,
      })
    );
    // registration({ username, email, password })
    //   .then((res) => history.push("/"))
    //   .catch((error) => {
    //     const errorObject = { ...error.response.data.errors };
    //     setError(errorObject);
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
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
        </fieldset>
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
  mapPropsToValues(user: any) {
    // Init form field
    return {
      imageURL:
        "https://realworld-temp-api.herokuapp.com/images/smiley-cyrus.jpeg",
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
} as any)(FormSettings);

export default FormikFormSettings;

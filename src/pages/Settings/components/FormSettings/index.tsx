import { withFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { updateUser } from "../../apis";

function FormSettings(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user.data.user);
  console.log({ user });
  const [error, setError] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(props.values);
    const { imageURL, bio, username, email, password } = props.values;
    updateUser({ imageURL, bio, username, email, password }, user.token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
    email: Yup.string().email(),
  }),
} as any)(FormSettings);

export default FormikFormSettings;

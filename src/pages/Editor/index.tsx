import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

function Editor(props: any) {
  // console.log("abc");
  const handleSubmit = (e: any) => {
    console.log(e);
  };
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    value={props.values.title}
                    onChange={props.handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Write your article (in markdown)"
                    name="content"
                    value={props.values.content}
                    onChange={props.handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
const FormikEditor = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      title: "",
      description: "",
      content: "",
      tag: [],
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    title: Yup.string().required("Please provide a title"),
    description: Yup.string().required("Please provide a description"),
    content: Yup.string().required("Please provide content"),
  }),
} as any)(Editor);

export default FormikEditor;

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import TagList from "./components/TagList";

function Editor(props: any) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<any>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(props.values, tags);
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState: any) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const handlePressSpaceTags = (e: any) => {
    console.log({ key: e.key });
    if (e.key === " ") {
      // setTags((prevState: any) => [...prevState, props.values.tags]);
      console.log({ inputTag: props.values.tags });
      props.values.tags = "";
    }
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
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
                    value={input}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                  />
                  <TagList tags={tags} setTags={setTags} />
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  // onClick={handleSubmit}
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

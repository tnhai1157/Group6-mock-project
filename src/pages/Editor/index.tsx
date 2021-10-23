import React, {
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import TagList from "./components/TagList";
import { getArticleBySlug, postArticle, putArticle } from "./apis";
import { useHistory, useParams } from "react-router";
import { FormProps, FormValues, Slug } from "./interface";

function Editor(props: InjectedFormikProps<FormProps, FormValues>) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<String[]>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const token = window.localStorage.getItem("jwtToken");
  const { slug } = useParams<Slug>();
  const { setFieldValue } = props;
  const history = useHistory();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!slug) {
      postArticle(props.values, tags, token).then((res) => {
        const slug = res.data.article.slug;
        history.push(`/article/${slug}`);
      });
    } else {
      putArticle(props.values, tags, token, slug).then((res) => {
        history.push(`/article/${slug}`);
      });
    }
  };

  useEffect(() => {
    if (slug) {
      getArticleBySlug(slug).then((res) => {
        const article = res.data.article;
        setFieldValue("title", article.title);
        setFieldValue("description", article.description);
        setFieldValue("content", article.body);
        setTags(article.tagList);
      });
    } else {
      setFieldValue("title", "");
      setFieldValue("description", "");
      setFieldValue("content", "");
    }
  }, [slug, setFieldValue]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags?.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop() as string;

      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
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
                  <p className="error-messages">{props.errors.title}</p>
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
                  <p className="error-messages">{props.errors.description}</p>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <p className="error-messages">{props.errors.content}</p>
                  <textarea
                    rows={6}
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
                    placeholder="Write your tag"
                    value={input}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                  />
                  <TagList tags={tags} setTags={setTags} />
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  disabled={!props.isValid || !props.values.title}
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
  handleSubmit: () => {},
})(Editor);

export default FormikEditor;

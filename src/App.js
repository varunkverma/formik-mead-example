import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const App = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field
        type="email"
        name="email"
        value={values.email}
        placeholder="email..."
      />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field
        type="password"
        name="password"
        value={values.password}
        placeholder="password..."
      />
    </div>
    <label htmlFor="newsletter">
      Opt for newsletter?
      <Field
        type="checkbox"
        name="newsletter"
        id="newsletter"
        checked={values.newsletter}
      />
    </label>
    <Field
      name="plan"
      as="select"
      value={values.plan}
      placeholder="Favorite plan"
    >
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button disabled={isSubmitting} type="submit">
      Submit
    </button>
  </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "red"
    };
  },
  // Formik works with Yup package's validationSchema
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Emial is required"),
    password: Yup.string()
      .min(9, "Password must be 9 characters or long")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // the second parameter in handleSubmit is formikBag

    // async task
    setTimeout(() => {
      if (values.email === "user1@gmail.com") {
        setErrors({
          email: "That email is already taken"
        });
      } else {
        console.log("Hey Hey");
        resetForm();
        console.log(values);
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);
export default FormikApp;

import React from "react";
import * as yup from "yup";
import { Formik } from "formik";

const FormikTest = () => {
  let schema = yup.object().shape({
    companyName: yup.string().required("Обязательное поле"),
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(5),
  });

  return (
    <div>
      <Formik
        initialValues={{
          companyName: "",
          email: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={"form"}>
            <label htmlFor={"companyName"}>компания</label>
            <br />
            <input
              type="text"
              name={"name"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyName}
            />
            {touched.companyName && errors.companyName && (
              <p>{errors.companyName}</p>
            )}
            <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              send
            </button>
         </div>)
        }
      </Formik>
    </div>
  );
};

export default FormikTest;

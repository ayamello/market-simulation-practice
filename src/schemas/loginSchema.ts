import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required("Username field is required"),
  password: yup.string().min(6).required("Password field is required"),
});

export default loginSchema;

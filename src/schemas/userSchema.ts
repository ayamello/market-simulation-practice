import * as yup from "yup";
import { v4 } from "uuid";
import * as bcrypt from "bcryptjs";

const userSchema = yup.object().shape({
  uuid: yup
    .string()
    .default(() => v4())
    .transform(() => v4()),
  name: yup.string().required("Name field is required"),
  email: yup.string().email().required("Email field is required"),
  password: yup
    .string()
    .min(6)
    .required("Password field is required")
    .transform((value, originalValue) => bcrypt.hashSync(originalValue, 10)),
  isAdm: yup.boolean().required("isAdm field is required"),
  createdOn: yup.date().default(() => new Date()),
  updatedOn: yup.date().default(() => new Date()),
  token: yup.string().default(() => "")
});

export default userSchema;

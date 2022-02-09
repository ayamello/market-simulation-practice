import * as yup from "yup";
import { v4 } from "uuid";

const productSchema = yup.object().shape({
  uuid: yup
    .string()
    .default(() => v4())
    .transform(() => v4()),
  name: yup.string().required("Name field is required"),
  unit_value: yup.number().positive().required("Unit value field is required"),
  quantity: yup.number().positive().required("Quantity field is required"),
  createdOn: yup.date().default(() => new Date()),
  updatedOn: yup.date().default(() => new Date()),
});

export default productSchema;

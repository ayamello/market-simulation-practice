import * as yup from "yup";

const productToCartSchema = yup.object().shape({
  quantity: yup.number().positive().required("Quantity field is required"),
});

export default productToCartSchema;

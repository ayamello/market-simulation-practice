import * as yup from "yup";

const productToCartSchema = yup.object().shape({
  product_id: yup.string().required("Product Id field is required"),
  quantity: yup.number().positive().required("Quantity field is required"),
});

export default productToCartSchema;

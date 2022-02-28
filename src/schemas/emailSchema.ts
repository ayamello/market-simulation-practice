import * as yup from "yup";

const emailSchema = yup.object().shape({
    from: yup.string().email().required("From field is required"),
    to: yup.string().email().required("To field is required"),
    subject: yup.string().required("Subject field is required"),
    text: yup.string().required("Subject field is required")
});

export default emailSchema;

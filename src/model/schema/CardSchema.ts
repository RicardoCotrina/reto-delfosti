import * as yup from "yup";

export const CardSchema = yup.object().shape({
  cardNumber: yup.number().required(),
  cvv: yup.number().required(),
  expirationMonth: yup.string().required(),
  expirationYear: yup.string().required(),
  email: yup.string().required(),
});

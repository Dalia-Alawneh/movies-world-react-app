import * as Yup from 'yup'
export const logSchema = Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().required().matches(),
})
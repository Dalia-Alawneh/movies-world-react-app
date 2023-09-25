import * as Yup from 'yup'
export const regSchema = Yup.object({
    email:Yup.string().email().required(),
    userName:Yup.string().required(),
    password:Yup.string().required(),
    cPassword:Yup.string().required().oneOf([Yup.ref('password')])
})
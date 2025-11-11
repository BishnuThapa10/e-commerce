import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button.jsx';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(5, "Atleast 5 character long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Minimunm 8 words!").required("Required"),
});

export default function RegisterForm({ setMode }) {
  return (
    <div className="w-full max-w-xs p-4 mx-auto space-y-4">
      <h3 className='text-lg font-semibold'>Register</h3>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="username"
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="********"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <p className='text-xs'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='font-semibold'>privacy policy.</span></p>

            <div className='flex gap-4 items-center'>
              <Button type="submit"
                variant="outline"
                className="border-black text-xs px-8"
              >Register</Button>
              <span onClick={() => setMode("login")}
                className='text-xs text-gray-600 cursor-pointer'> Already have an account?</span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Checkbox } from '../../components/ui/checkbox.jsx';
import { Loader2 } from 'lucide-react';
import { useLoginUserMutation } from './accountApi.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { setUser } from './userSlice.js';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function LoginForm({ setMode }) {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <div className="w-full max-w-xs p-4 mx-auto space-y-4">
      <h3 className='text-lg font-semibold'>Login</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (val) => {
          try {
            const response = await loginUser(val).unwrap();
            toast.success('Logged in');
            const {token} = response;
            dispatch(setUser({token}));
            nav(-1);
          } catch (err) {
            toast.error(err.data?.message)
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <label htmlFor="terms" className='text-xs'>Remember me</label>
            </div>

            <div className='flex gap-4 items-center'>
              <Button type="submit"
                variant="outline"
                className="border-black text-xs px-8"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                Login</Button>
              <span onClick={() => setMode("register")}
                className='text-xs text-gray-600 cursor-pointer'> Don't have an account?</span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

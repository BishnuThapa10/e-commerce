import React from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import { MdLocationPin } from "react-icons/md";
import { HiPhone } from "react-icons/hi2";
import { AiFillClockCircle } from "react-icons/ai";
import * as Yup from "yup";
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Formik } from 'formik';
import { Textarea } from '../../components/ui/textarea.jsx';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(3, "Atleast 3 character long!").max(20).required(),
  email: Yup.string().email("Invalid email").max(20).required("Required"),
  subject: Yup.string().max(20).min(3, "Too short!").optional(),
  message: Yup.string().max(100).min(3).required()
});

export default function ContactPage() {
  return (
    <div>
      <OtherPageHeroSection text="Contact" />
      <div className=' p-6 md:p-10 space-y-10'>

        <div className='mx-auto text-center max-w-lg space-y-2'>
          <p className='text-xl font-semibold'>Get In Touch With Us</p>
          <p className='text-sm text-[#9F9F9F]'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8'>

          <div className='grid grid-cols-[max-content_1fr] md:grid-cols-[1fr_2.5fr] grid-rows-3 gap-x-4 gap-y-2 items-start justify-self-start md:justify-self-end order-2 md:order-1 max-w-xs w-full'>

            <div className='justify-self-end'>
              <MdLocationPin />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className="font-semibold leading-none">Address</h3>
              <p className='text-xs max-w-40'>236 5th SE Avenue, New York NY10000, United States</p>
            </div>

            <div className='justify-self-end'>
              <HiPhone />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className="font-semibold leading-none">Phone</h3>
              <p className='text-xs'>Mobile: +(84) 546-6789 <br /> Hotline: +(84) 456-6789</p>
            </div>

            <div className='justify-self-end'>
              <AiFillClockCircle />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className="font-semibold leading-none">Working Time</h3>
              <p className='text-xs max-w-40'>Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00</p>
            </div>

          </div>



          <div className='w-full max-w-sm justify-self-start md:justify-self-center order-1 md:order-2'>
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={ContactSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched, getFieldProps }) => (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
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

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      placeholder="This is optional"
                    />
                    {errors.subject && touched.subject && (
                      <p className="text-red-500 text-xs">{errors.subject}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      // value={values.message}
                      // onChange={handleChange}
                      placeholder="Hi! i’d like to ask about"
                      {...getFieldProps("message")}
                    />
                    {errors.message && touched.message && (
                      <p className="text-red-500 text-xs">{errors.message}</p>
                    )}
                  </div>


                  <Button type="submit"
                    variant="outline"
                    className="border-black text-xs px-8"
                  >Submit</Button>

                </form>
              )}
            </Formik>
          </div>

        </div>

      </div>
      <PolicySection />
    </div>
  )
}

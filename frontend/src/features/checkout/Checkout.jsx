import React from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import * as Yup from "yup";
import { Formik } from 'formik';
import { Input } from '../../components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select.jsx';
import { Button } from '../../components/ui/button.jsx';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group.jsx';

const CheckoutSchema = Yup.object().shape({
  firstname: Yup.string().min(3, "Atleast 3 character long!").max(10).required("Required"),
  lastname: Yup.string().min(3, "Atleast 3 character long!").max(10).required("Required"),
  email: Yup.string().email("Invalid email").max(20).required("Email is Required"),
  company: Yup.string().max(20).min(3, "Too short!").optional(),
  country: Yup.string().required("Country is Required"),
  street: Yup.string().max(20).min(3).required(),
  city: Yup.string().max(20).min(3).required(),
  province: Yup.string().max(20).min(3, "Too short!").required("Province can't be empty"),
  zipcode: Yup.string().required('ZIP code is required').matches(/^\d{5}(-\d{4})?$/, 'ZIP code is not valid'),
  phone: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  addinfo: Yup.string().max(20).min(3, "Too short!").optional()
});

export default function Checkout() {
  return (
    <div>
      <OtherPageHeroSection text="Checkout" />

      <Formik
        initialValues={{ firstname: "", lastname: "", company: "", country: "", street: "", city: "", province: "", zipcode: "", phone: "", email: "", addinfo: "" }}
        validationSchema={CheckoutSchema}
        onSubmit={(val) => {
          console.log(val);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit} className='p-10 lg:px-30 flex justify-between flex-col sm:flex-row gap-6 md:gap-2'>

            <div className='flex flex-col w-full max-w-xs space-y-4'>
              <h3 className='text-lg font-semibold'>Billing details</h3>

              {/* Username */}
              <div className='flex gap-2'>
                {/* First name */}
                <div className="space-y-2">
                  <label htmlFor="firstname" className="block text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    placeholder="firstname"
                  />
                  {errors.firstname && touched.firstname && (
                    <p className="text-red-500 text-xs">{errors.firstname}</p>
                  )}
                </div>
                {/* Last name */}
                <div className="space-y-2">
                  <label htmlFor="lastname" className="block text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    placeholder="lastname"
                  />
                  {errors.lastname && touched.lastname && (
                    <p className="text-red-500 text-xs">{errors.lastname}</p>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium">
                  Company Name(Optional)
                </label>
                <Input
                  id="company"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  placeholder="Company"
                />
                {errors.company && touched.company && (
                  <p className="text-red-500 text-xs">{errors.company}</p>
                )}
              </div>

              {/* Country/Region */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium">
                  Country/Region
                </label>
                <Select
                  id="country"
                  name="country"
                  value={values.country}
                  onValueChange={(val) => setFieldValue("country", val)}
                  onBlur={() => setFieldTouched("country", true)}
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder={countries[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && touched.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>

              {/* Street Address */}
              <div className="space-y-2">
                <label htmlFor="street" className="block text-sm font-medium">
                  Street address
                </label>
                <Input
                  id="street"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  placeholder="street"
                />
                {errors.street && touched.street && (
                  <p className="text-red-500 text-xs">{errors.street}</p>
                )}
              </div>

              {/* Town/City */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium">
                  Town/City
                </label>
                <Input
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  placeholder="city"
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>

              {/* Province */}
              <div className="space-y-2">
                <label htmlFor="province" className="block text-sm font-medium">
                  Province
                </label>
                <Select
                  id="province"
                  name="province"
                  value={values.country}
                  onValueChange={(val) => setFieldValue("province", val)}
                  onBlur={() => setFieldTouched("province", true)}
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder={provinces[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && touched.province && (
                  <p className="text-red-500 text-xs">{errors.province}</p>
                )}
              </div>

              {/* ZIP Code */}
              <div className="space-y-2">
                <label htmlFor="zipcode" className="block text-sm font-medium">
                  ZIP code
                </label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  placeholder="zipcode"
                />
                {errors.zipcode && touched.zipcode && (
                  <p className="text-red-500 text-xs">{errors.zipcode}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="phone"
                  type="tel"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
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

              {/* Addinfo */}
              <div className="space-y-2">
                <label htmlFor="addinfo" className="block text-sm font-medium"> </label>
                <Input
                  id="addinfo"
                  name="addinfo"
                  value={values.addinfo}
                  onChange={handleChange}
                  placeholder="Additional information"
                />
                {errors.addinfo && touched.addinfo && (
                  <p className="text-red-500 text-xs">{errors.addinfo}</p>
                )}
              </div>

            </div>

            <div className='flex flex-col w-full  max-w-xs gap-4 px-2 py-4'>

              <div className='grid grid-cols-2 w-full space-y-4 border-b border-b-[#D9D9D9]'>

                <p className='justify-self-start text-md font-semibold'>Product</p>
                <p className='justify-self-end text-md font-semibold'>Subtotal</p>

                <p className='justify-self-start text-sm'><span className='text-[#9F9F9F]'>Asgard sofa</span> x 1</p>
                <p className='justify-self-end text-sm'>Rs.250000.00</p>

                <p className='justify-self-start text-sm'>Subtotal</p>
                <p className='justify-self-end text-sm'>Rs.250000.00</p>

                <p className='justify-self-start text-sm'>Total</p>
                <p className='justify-self-end text-md font-semibold text-[#B88E2F]'>Rs.250000.00</p>
              </div>
              
              <p className='text-xs text-justify'>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>

              <RadioGroup defaultValue="bank">
                <div className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="bank" id="r1" />
                  <label htmlFor="r1">Direct Bank Transfer</label>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="cash" id="r2" />
                  <label htmlFor="r2">Cash on delivery</label>
                </div>
              </RadioGroup>

              <p className='text-xs text-justify'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='font-semibold'>privacy policy.</span></p>

              <div className='flex justify-center'>
                <Button type="submit"
                  variant="outline"
                  className="border-black text-sm px-14"
                >Place order</Button>
              </div>

            </div>

          </form>
        )}
      </Formik>

      <PolicySection />
    </div>
  )
}

const countries = ["Sri Lanka", "Nepal", "India"];
const provinces = ["Western Province", "Eastern Province", "Northern Province", "Southern Province",];

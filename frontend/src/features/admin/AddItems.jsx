import React from 'react'
import * as Yup from 'yup';
import { category, commonSchema, roomType, supportedFormats } from './validation.js';
import { Formik } from 'formik';
import { Input } from '../../components/ui/input.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Loader2 } from 'lucide-react';
import ColorPicker from './ColorPicker.jsx';
import SizePicker from './SizePicker.jsx';
import { Checkbox } from '../../components/ui/checkbox.jsx';
import { useAddItemMutation } from '../product/productApi.js';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import FullScreenLoader from '../../components/website/FullScreenLoader.jsx';


const valSchema = Yup.object({
  ...commonSchema,

  images: Yup.mixed()
    .required("Images are required")
    .test("minImages", "At least 1 image is required", (value) => {
      return value && value.length >= 1;
    })
    .test("maxImages", "You can upload up to 4 images", (value) => {
      return value && value.length <= 4;
    })
    .test("fileType", "Invalid file type", (value) => {
      if (!value) return false;
      return [...value].every((file) => supportedFormats.includes(file.type));
    })
    .test("fileSize", "Each file must be under 5MB", (value) => {
      if (!value) return false;
      return [...value].every((file) => file.size <= 5 * 1024 * 1024);
    })

});


export default function AddItems() {
  const [addItem, { isLoading }] = useAddItemMutation();
  const nav = useNavigate();

  return (
    <>
      <FullScreenLoader show={isLoading} message="Please wait it may time..." />
      <div className="w-full max-w-sm bg-white p-4 mx-auto space-y-4">
        <h3 className='text-lg font-semibold'>Add New Furniture</h3>
        <Formik
          initialValues={{
            name: "",
            description: "",
            category: "",
            size: [],
            roomType: "",
            images: [],
            price: "",
            stock: "",
            colors: [],
            isFeatured: false,
          }}

          validationSchema={valSchema}

          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("description", val.description);
              formData.append("category", val.category);
              formData.append("roomType", val.roomType);
              formData.append("price", val.price);
              formData.append("stock", val.stock);
              formData.append("isFeatured", val.isFeatured);

              // / Send arrays correctly
              val.size.forEach((s) => formData.append("size[]", s));

              // colors array of objects
              val.colors.forEach((color, index) => {
                formData.append(`colors[${index}][name]`, color.name);
                formData.append(`colors[${index}][hex]`, color.hex);
              });

              // multiple images
              val.images.forEach((file) => {
                formData.append("images", file);
              });

              const result = await addItem({ formData }).unwrap();
              if (result.error) {
                const message = result.error?.data?.message || result.error?.error || "Something went wrong";
                toast.error(message)
              }
              resetForm();
              toast.success("Post Created");
              nav(-1);
              // console.log(val);
            } catch (err) {
              const message = err?.data?.message || err?.error || "Something went wrong";
              toast.error(message)
            }
          }}
        >
          {({ handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, getFieldProps }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  {...getFieldProps("name")}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write Something about..."
                  {...getFieldProps("description")}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <Select
                  id="category"
                  name="category"
                  value={values.category}
                  onValueChange={(val) => setFieldValue("category", val)}
                  onBlur={() => setFieldTouched("category", true)}
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>

              {/* Room Type */}
              <div className="space-y-2">
                <label htmlFor="roomType" className="block text-sm font-medium">
                  Room Type
                </label>
                <Select
                  id="roomType"
                  name="roomType"
                  value={values.roomType}
                  onValueChange={(val) => setFieldValue("roomType", val)}
                  onBlur={() => setFieldTouched("roomType", true)}
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Select Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomType.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.roomType && touched.roomType && (
                  <p className="text-red-500 text-xs">{errors.roomType}</p>
                )}
              </div>

              {/* Price and Stock */}
              <div className='flex gap-3'>
                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Price"
                    type='number'
                    {...getFieldProps("price")}
                    onChange={(e) => setFieldValue("price", Number(e.target.value))}
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-xs">{errors.price}</p>
                  )}
                </div>
                {/* Stock */}
                <div className="space-y-2">
                  <label htmlFor="stock" className="block text-sm font-medium">
                    Stock
                  </label>
                  <Input
                    id="stock"
                    name="stock"
                    placeholder="stock"
                    type='number'
                    {...getFieldProps("stock")}
                    onChange={(e) => setFieldValue("stock", Number(e.target.value))}
                  />
                  {errors.stock && touched.stock && (
                    <p className="text-red-500 text-xs">{errors.stock}</p>
                  )}
                </div>
              </div>

              {/* Colors and Size */}
              <div className='flex gap-4 justify-between'>
                {/* Color */}
                <div className="space-y-2">
                  <label htmlFor="colors" className="block text-sm font-medium">
                    Colors
                  </label>
                  <ColorPicker
                    id="colors"
                    name="colors"
                    selectedColors={values.colors}
                    setSelectedColors={(colors) => setFieldValue("colors", colors)}
                  />
                  {errors.colors && touched.colors && (
                    <p className="text-red-500 text-xs">{errors.colors}</p>
                  )}
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <label htmlFor="size" className="block text-sm font-medium">
                    Size
                  </label>
                  <SizePicker
                    id="size"
                    name="size"
                    selectedSizes={values.size}
                    setSelectedSizes={(sizes) => setFieldValue("size", sizes)}
                  />
                  {errors.size && touched.size && (
                    <p className="text-red-500 text-xs">{errors.size}</p>
                  )}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label htmlFor="images" className="block text-sm font-medium">
                  Images
                </label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    const existing = values.images ? [...values.images] : [];
                    setFieldValue("images", [...existing, ...newFiles]);
                  }}
                  onBlur={handleBlur}
                />
                {errors.images && touched.images && (
                  <p className="text-red-500 text-xs">{errors.images}</p>
                )}
              </div>

              {/* Preview Grid */}
              {values.images && values.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {values.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-lg border shadow-sm"
                      />

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = values.images.filter((_, i) => i !== index);
                          setFieldValue("images", updated);
                        }}
                        className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full px-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Featuredin */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isFeatured"
                  name="isFeatured"
                  checked={values.isFeatured}
                  onCheckedChange={e => setFieldValue('isFeatured', e)}
                  onBlur={() => setFieldTouched('isFeatured', true)}
                />
                <label htmlFor="isFeatured" className="text-sm cursor-pointer">
                  Is Featured
                </label>
              </div>

              {/* Submit Button */}
              <Button type="submit"
                variant="outline"
                className="border-black text-xs px-8"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                Submit</Button>

            </form>
          )}
        </Formik>
      </div >
    </>
  )
}

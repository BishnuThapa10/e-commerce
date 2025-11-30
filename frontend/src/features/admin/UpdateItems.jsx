import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetSingleItmeQuery, useUpdateItemMutation } from '../product/productApi.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import * as Yup from 'yup';
import { category, commonSchema, roomType, supportedFormats } from './validation.js';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { Input } from '../../components/ui/input.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select.jsx';
import ColorPicker from './ColorPicker.jsx';
import SizePicker from './SizePicker.jsx';
import { Checkbox } from '../../components/ui/checkbox.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Loader2 } from 'lucide-react';
import FullScreenLoader from '../../components/website/FullScreenLoader.jsx';

const valSchema = Yup.object({
  ...commonSchema,

  images: Yup.array()
    .min(1, "At least one image is required")
    .max(4, "You can upload up to 4 images")
    .test("hasImages", "At least one image must exist", (images) => images?.length > 0)
    .test("fileType", "Invalid file type", (images) =>
      images?.every((img) => (img instanceof File ? supportedFormats.includes(img.type) : true))
    )
    .test("fileSize", "Each file must be under 5MB", (images) =>
      images?.every((img) => (img instanceof File ? img.size <= 5 * 1024 * 1024 : true))
    ),
});

export default function UpdateItems() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleItmeQuery(id);
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation()
  const nav = useNavigate();

  if (isLoading) return <Loader text="Please Wait..." />;
  if (isError) return (
    <ErrorMessage message={error.data?.message || error?.message || 'Something went wrong'} />
  );
  return (
    <>
      <FullScreenLoader show={isUpdating} message="Please wait it may time..." />
      <div className="w-full max-w-sm bg-white p-4 mx-auto space-y-4">
        <h3 className='text-lg font-semibold'>Update Data</h3>
        <Formik
          initialValues={{
            name: data?.furniture?.name || "",
            description: data?.furniture?.description || "",
            category: data?.furniture?.category || "",
            size: data?.furniture?.size || [],
            roomType: data?.furniture?.roomType || "",
            images: data?.furniture?.images || [],
            price: data?.furniture?.price || "",
            stock: data?.furniture?.stock || "",
            colors: data?.furniture?.colors || [],
            isFeatured: data?.furniture?.isFeatured || false,
          }}

          validationSchema={valSchema}

          onSubmit={async (val) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("description", val.description);
              formData.append("category", val.category);
              formData.append("roomType", val.roomType);
              formData.append("price", val.price);
              formData.append("stock", val.stock);
              formData.append("isFeatured", val.isFeatured);

              // Send arrays correctly
              val.size.forEach((s) => { formData.append("size[]", s) });

              // colors array of objects
              val.colors.forEach((color, index) => {
                formData.append(`colors[${index}][name]`, color.name);
                formData.append(`colors[${index}][hex]`, color.hex);
              });

              // Append new files only
              val.images
                .filter((img) => img instanceof File)
                .forEach((file) => formData.append("images", file));

              // Append existing images so backend knows which ones to keep
              const existingImages = val.images.filter((img) => !(img instanceof File));
              formData.append("existingImages", JSON.stringify(existingImages));

              const result = await updateItem({ id, formData }).unwrap();
              if (result.error) {
                const message = result.error?.data?.message || result.error?.error || "Something went wrong";
                toast.error(message)
              }
              toast.success("Data Updated");
              nav(-1);
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
              {/* Images Preview */}
              {values.images && values.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {values.images.map((img, index) => {
                    const src = img instanceof File ? URL.createObjectURL(img) : img.url;
                    return (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt="preview"
                          className="w-full h-24 object-cover rounded-lg border shadow-sm"
                        />

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "images",
                              values.images.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full px-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
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
                disabled={isUpdating}
              >
                {isUpdating && <Loader2 className="animate-spin h-4 w-4" />}
                Submit</Button>

            </form>
          )}
        </Formik>
      </div >
    </>
  )
}

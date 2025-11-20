import * as Yup from 'yup';


export const colors = [
  { name: "Blue", hex: "#816DFA" },
  { name: "Black", hex: "#000000" },
  { name: "Yellow", hex: "#CDBA7B" },
];

export const size = [
  "L", "XL", "XS"
]

export const category = [
  "Chair",
  "Table",
  "Sofa",
  "Bed",
  "Cabinet",
  "Shelf",
  "Outdoor",
  "Other",
]

export const roomType = ["Home", "Office", "Shop", "Outdoor", "Other"]

export const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const commonSchema = {
  name: Yup.string().trim().min(3, "Title must be at least 3 characters").required("Name is required"),
  description: Yup.string().min(20, "Description must be at least 20 characters").required("Description is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().min(0).required("Stock is required"),
  size: Yup.array().min(1, "At least one size is required").required("Size is required"),
  category: Yup.string().required("Category is required"),
  roomType: Yup.string().required("roomType is required"),
  isFeatured: Yup.boolean().default(false),
};

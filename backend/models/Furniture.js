import mongoose from "mongoose";


export const colorsEnum = [
  { name: "Blue", hex: "#816DFA" },
  { name: "Black", hex: "#000000" },
  { name: "Yellow", hex: "#CDBA7B" },
];

export const sizeEnum = [
  "L", "XL", "XS"
]

export const categoryEnum = [
  "Chair",
  "Table",
  "Sofa",
  "Bed",
  "Cabinet",
  "Shelf",
  "Outdoor",
  "Other",
]

export const roomTypeEnum = ["Home", "Office", "Shop", "Outdoor", "Other"]


const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    minlength: 20,
  },

  category: {
    type: String,
    enum: categoryEnum,
    required: true
  },

  size: {
    type: String,
    enum: sizeEnum,
    required: true
  },

  roomType: {
    type: String,
    enum: roomTypeEnum,
    required: true
  },

  images: [
    {
      url: { type: String, default: null },
      public_id: { type: String, default: null }
    },
  ],

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  colors: {
    type: [
      {
        name: { type: String, enum: colorsEnum.map(c => c.name), required: true },
        hex: { type: String, required: true },
      },
    ],
    default: [],
  },

  tags: {
    type: [String],
    default: [],
    index: true,
  },

  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// ✅ Pre-save hook to automatically attach hex from color name
furnitureSchema.pre("save", function (next) {
  const colorMap = new Map(colorsEnum.map(c => [c.name, c.hex]));

  this.colors = this.colors.map(color => {
    const hex = colorMap.get(color.name);
    if (!hex) {
      throw new Error(`Invalid color name: ${color.name}`);
    }
    return { name: color.name, hex };
  });

  next();
});

const Furniture = mongoose.model('Furniture', furnitureSchema);
export default Furniture;

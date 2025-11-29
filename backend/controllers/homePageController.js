import Furniture from "../models/Furniture.js"


// Hero Image
export const getHeroFurniture = async (req, res) => {
  try {
    let hero = await Furniture.findOne({ isFeatured: true }).lean();

    if (!hero) {
      hero = await Furniture.findOne().sort('-ratings.average').lean();
    }

    return res.status(200).json({ hero });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

// Category Furniture Items Only two one of each
export const getCategoryFurniture = async (req, res) => {
  try {
    const categories = req.query.categories
      ? req.query.categories.split(",").map(cat => cat.trim())
      : ["Chair", "Table"];

    const furnitures = await Furniture.aggregate([
      {
        $match: {
          category: { $in: categories }
        }
      },
      {
        $sort: { "ratings.average": -1 }
      },
      {
        $group: {
          _id: "$category",
          furniture: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$furniture" }
      }
    ]);
    return res.status(200).json({ furnitures });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

// New Arrival
export const getNewArrival = async (req, res) => {
  try {
    const furniture = await Furniture.findOne().sort({ createdAt: -1 });
    return res.status(200).json({ furniture });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}
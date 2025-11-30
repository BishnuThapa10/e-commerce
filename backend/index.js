import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import furnitureRoute from './routes/furnitureRoutes.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import homePageRoute from './routes/homePageRoute.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
//   .then(() => {
//     app.listen(port, () => {
//       console.log("database connected and server is running")
//     });
//   }).catch((err) => {
//     console.log(err)
//   })


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://e-commerce-seven-tau-74.vercel.app'
  ],
  credentials: true,
}));

app.use(furnitureRoute);
app.use(userRoute);
app.use(orderRoute);
app.use(reviewRoute);
app.use(homePageRoute);


app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // This is a Joi validation error
    return res.status(400).json({
      message: err.error.details.map(d => d.message).join(", ")
    });
  }

  // Other errors
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.log(err)
});
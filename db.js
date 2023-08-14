const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully!");

    const fetchedData = await mongoose.connection.db.collection("food");
    const data = await fetchedData.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("category");
    const catData = await foodCategory.find({}).toArray();

    // Assign the fetched data to the global variables
    global.food = data;
    global.foodCategory = catData;

    console.log(global.food);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;

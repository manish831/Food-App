const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://manish:manish8574@cluster0.vwwriit.mongodb.net/twiggyApp?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
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

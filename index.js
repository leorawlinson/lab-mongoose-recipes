const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pizza",
      level: "Easy Peasy",
      ingredients: ["Flour", "Eggs", "Water", "Tomato", "Cheese", "Ham"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 30,
      creator: "Papa-Johns",
      created: "1950-03-12",
    });
  })
  .then((response) => {
    return Recipe.find();
  })
  .then((response) => {
    return Recipe.insertMany(data);
  })
  .then((response) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((response) => {
    console.log("It worked", response);

    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((response) => {
    console.log("Carrot Cake deleted", response);

    return mongoose.connection.close();
  })
  .then((response) => {
    console.log("connection closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

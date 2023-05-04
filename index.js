let mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
let Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
let data = require('./data');

let MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await

let manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    let dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    let bacalhauBras = {
      title: "Bacalhau à Brás",
      level: "Easy Peasy",
      ingredients: ["Codfish", "Onions", "garlic", "potatoes", "eggs", "milk", "olives"],
      cuisine: "Portuguese",
      dishType: "main_course",
      image: "https://www.pingodoce.pt/wp-content/uploads/2016/03/bacalhau-a-bras.jpg",
      duration: 30,
      creator: "Senhor Brás"
    };
    await Recipe.create(bacalhauBras);
   
    let arrayOfRecipes = await Recipe.insertMany(data);
    for (let i = 0; i< arrayOfRecipes.length; i++) {
      console.log(arrayOfRecipes[i].title);
    }
    

    await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100});
    console.log("Duration updated!")

    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log("Carrot Cake removed!")

    mongoose.connection.close(function() {console.log('Mongoose connection closed')});

  } catch (error) {
    console.log(error);
  }
};


manageRecipes();
























//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

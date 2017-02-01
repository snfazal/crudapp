*My-Top-Shelf*

A app to reach your best self by helping to design a personalized skincare routine.

https://my-top-shelf.herokuapp.com/

https://github.com/snfazal/crudapp

*Approach and Features*

Ideally, users would be able to build up their product plans and then store their favorite routines as documents. They would then be able to compare different routines and interchange the products they wanted to keep on their top shel.
However this was problematic on the development end, due to the fact that there is no way of updating embedded documents with mongoose.

In its current stage, users are able to create their very own list of products and save or update the product details as the choose. They have the ability to analyze their routines with a platform that helps them collect data on how the product works for them, when the purchased the product and when to buy it again, and how it fits into their personal day-to-day.

*Technologies*

The app is made up of javascript, node.js, mongo, and minor html/css. I used a server file as the main frame to the app which connects to all the other files.

The two models used within the app are specific to the users and then the products. 

ERD: User: { name: String, email: String, password: String, products: {name: String, use: String, routine: String, favorites: String, details: String, rating: Value, bought: String}}

*What to Expect*

There are a few features I'd like to add into the app:

  - Users able to save a set of products as a routine
  - Favorites feature that saves all the favorite products in different routines
  - A water feature so users can track how much water they have drank   
  - an alert feature to remind uses to track their water (flash messaging)
  - Styling!
  - logout button

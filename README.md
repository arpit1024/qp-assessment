# grocery-store

## Getting started
To start the project
 1. Clone Project
 2. Run npm install
 3. Run npm start
just see the api structure and create a product first 
you can then do all CRUD operations.
follow all admin and user apis to perform different tasks

# product creation api structure
Http POST req Url: http://localhost:9200/grocery-store/admin/add-new-grocery
payload: {
    "itemId": "6616be78f6890f6497b7bf31",
    "name": "Milk",
    "price": 100,
    "category": "deitary",
    "brand": "Amul",
    "weight": 1000
}
# description  
A Node js backend app for an assignment have admin and user apis
Cons: Not made middleware for authentication of admin or user

# tech stack
Type script, node js, mongodb, express, Webpack, Docker


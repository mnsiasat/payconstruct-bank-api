# payconstruct-bank-api

### Steps to Run: ###
1. __Run schema sync.__ "synchronize" in ormconfig.ts is set to false, since it syncs schemas with every application launch which can further lead to loss of existing data which we want to avoid in production. To run sync manually, use this command: 

   > npm run typeorm:cli schema:sync
   
2. __Run the app.__ FYI, please use the dev environment command below which is actually calling nodemon. This works perfectly fine. At the moment, I'm stilling getting an error when calling node on the compiled dist/src/index.js.

   > npm run start:dev


3.  __Access the GraphQL endpoints.__ You may use Postman and import my postman collection <https://github.com/mnsiasat/payconstruct-bank-api/blob/master/PAYCONSTRUCT.postman_collection.json>

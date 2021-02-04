# payconstruct-bank-api

"synchronize" in ormconfig.ts is set to false, since it syncs schemas with every application launch which can further lead to loss of existing data which we want to avoid in production. To run sync manually, use this command:

npm run typeorm:cli schema:sync

****** MongoDB Utility Applications ******

node .\utils\mongodb_create.js
node .\utils\mongodb_createCollection.js
node .\utils\mongodb_delete.js
node .\utils\mongodb_drop_collection.js
node .\utils\mongodb_find_all.js
node .\utils\mongodb_find_fields.js
node .\utils\mongodb_find_one.js
node .\utils\mongodb_insert_ids.js
node .\utils\mongodb_insert_many.js
node .\utils\mongodb_insert_one.js
node .\utils\mongodb_limit_results.js
node .\utils\mongodb_query.js
node .\utils\mongodb_regex.js
node .\utils\mongodb_sort.js

****** Docker ******

docker run -p 27017:27017 --name mng -d mongo:4.1.6
docker exec -it mng bash

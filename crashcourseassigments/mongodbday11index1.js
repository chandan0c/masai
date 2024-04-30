use my_database
db.createCollection("my_collection")

// Insert documents into the collection


db.my_collection.insertMany([
  { name: "John", age: 30, location: "New York" },
  { name: "Alice", age: 25, location: "London" },
  { name: "Bob", age: 35, location: "Paris" },
  { name: "Emily", age: 28, location: "Tokyo" },
  { name: "Michael", age: 40, location: "Berlin" },
  { name: "Sophia", age: 27, location: "Sydney" },
  { name: "David", age: 32, location: "Toronto" },
  { name: "Emma", age: 29, location: "Los Angeles" },
  { name: "Olivia", age: 31, location: "Mumbai" },
  { name: "James", age: 33, location: "Rio de Janeiro" }
])

// Create a compound index:

db.my_collection.createIndex({ age: 1, location: 1 });

//Use explain() to analyze query performance with the compound index
db.my_collection.find({ age: 30, location: "New York" }).explain("executionStats")
//Create a single field index on a field not included in the compound index
db.my_collection.createIndex({ name: 1 });

//Use explain() to compare query performance between single field index and compound index
// Query using compound index
db.my_collection.find({ age: 30, location: "New York" }).explain("executionStats")

// Query using single field index
db.my_collection.find({ name: "John" }).explain("executionStats")
// Drop the single field index and create a multi-key index on an array field

db.my_collection.dropIndex("name_1")

// Assuming an array field named "interests" exists in one of the documents
db.my_collection.createIndex({ "interests": 1 })

//Use explain() to analyze query performance with the multi-key index
db.my_collection.find({ interests: "hiking" }).explain("executionStats")
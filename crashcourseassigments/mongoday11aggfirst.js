// Connect to your MongoDB database
use your_database_name;

// Insert documents into the first collection (personal information)
db.personal_info.insertMany([
    { _id: 1, name: "John", age: 25, address: "123 Main St" },
    { _id: 2, name: "Jane", age: 35, address: "456 Main St" },
    { _id: 3, name: "Bob", age: 45, address: "789 Main St" },
    { _id: 4, name: "Alice", age: 55, address: "246 Main St" }
]);

// Insert documents into the second collection (zip code information)
db.zipcodes.insertMany([
    { _id: 1, address: "123 Main St", zipcode: "12345" },
    { _id: 2, address: "456 Main St", zipcode: "54321" },
    { _id: 3, address: "789 Main St", zipcode: "98765" },
    { _id: 4, address: "246 Main St", zipcode: "24680" }
]);

// Insert documents into the third collection (city and state information)
db.cities_and_states.insertMany([
    { _id: 1, zipcode: "12345", city: "New York", state: "NY" },
    { _id: 2, zipcode: "54321", city: "Chicago", state: "IL" },
    { _id: 3, zipcode: "98765", city: "Los Angeles", state: "CA" },
    { _id: 4, zipcode: "24680", city: "Miami", state: "FL" }
]);

// Insert documents into the fourth collection (country information)
db.countries.insertMany([
    { _id: 1, state: "NY", country: "USA" },
    { _id: 2, state: "IL", country: "USA" },
    { _id: 3, state: "CA", country: "USA" },
    { _id: 4, state: "FL", country: "USA" },
    { _id: 5, state: "MH", country: "India" },
    { _id: 6, state: "DL", country: "India" }
]);

// Step 2: Perform $lookup operations to join collections

// Join personal_info and zipcodes collections
db.personal_info.aggregate([
    {
        $lookup: {
            from: "zipcodes",
            localField: "address",
            foreignField: "address",
            as: "zip_info"
        }
    },
 
    { $unwind: "$zip_info" },
    
    {
        $lookup: {
            from: "cities_and_states",
            localField: "zip_info.zipcode",
            foreignField: "zipcode",
            as: "city_state_info"
        }
    },
 
    { $unwind: "$city_state_info" },
   
    {
        $lookup: {
            from: "countries",
            localField: "city_state_info.state",
            foreignField: "state",
            as: "country_info"
        }
    },
 
    { $unwind: "$country_info" },
  
    {
        $project: {
            _id: 1,
            name: 1,
            age: 1,
            address: 1,
            "zip_info.zipcode": 1,
            "city_state_info.city": 1,
            "city_state_info.state": 1,
            "country_info.country": 1
        }
    }
]);
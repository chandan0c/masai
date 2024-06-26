[
    {
      "$match": {
        "pop": { "$gt": 5000 }
      }
    },
    {
      "$group": {
        "_id": "$state",
        "totalPopulation": { "$sum": "$pop" }
      }
    },
    {
      "$sort": { "totalPopulation": -1 }
    },
    {
      "$skip": 2
    },
    {
      "$limit": 2
    },
    {
      "$project": {
        "_id": 0,
        "state": "$_id",
        "totalPopulation": 1
      }
    }
  ]
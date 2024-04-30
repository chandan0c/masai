db.sales.aggregate([

    {
      $match: {
        date: {
          $gte: {
            $subtract: [new Date(), { $multiply: [30 * 24 * 60 * 60 * 1000, 1] }], // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
          },
        },
      },
    },
    
    {
      $group: {
        _id: "$item",
        totalQuantitySold: { $sum: "$quantity" },
        totalRevenue: { $sum: "$total" },
        averagePricePerUnit: { $avg: "$price" },
      },
    },
  
    {
      $sort: { totalQuantitySold: -1 },
    },
  
    {
      $limit: 10,
    },
  ]);
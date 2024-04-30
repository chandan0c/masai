db.categories.aggregate([
    // Step 1: Perform a left join between categories and products collections
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "products",
      },
    },
    // Step 2: Group by category and calculate the count of products
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        parent: { $first: "$parent" },
        productCount: { $sum: { $size: "$products" } },
      },
    },
    // Step 3: Perform recursive lookup to get the count of products for subcategories
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "subcategories",
        maxDepth: 5,
      },
    },
    // Step 4: Group again to accumulate product count for each category and subcategory
    {
      $group: {
        _id: null,
        categories: {
          $push: {
            _id: "$_id",
            name: "$name",
            parent: "$parent",
            productCount: "$productCount",
          },
        },
        totalProducts: { $sum: "$productCount" },
      },
    },
    // Step 5: Project to reshape the document and include the total number of products
    {
      $project: {
        _id: 0,
        categories: 1,
        totalProducts: 1,
      },
    },
  ]);
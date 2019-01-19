const Pipeline = {
    category : {
        getAllCategories : [
            {
                $lookup: // Equality Match
                    {
                        from: "categories",
                        localField: "slug",
                        foreignField: "parent",
                        as: "child_categories"
                    }
            }
        ]
    }
};

module.exports = Pipeline;
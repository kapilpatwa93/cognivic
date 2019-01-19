let constants = {
    error_message : {
        general_error : "Something went wrong!",
        category_already_exist : "Category already exist",
        store_error_reset : "Something went wrong while storing data. All Service centres removed.",
        fetch_error_reset : "Something went wrong while fetching data. All Service centres removed.",
        store_error : "Something went wrong while storing data.Please clear service centre manually",
        fetch_error : "Something went wrong while fetching data.Please clear service centre manually"

    },
    error_code : {
        general_error:1000,
        validation_error : 1001,
        store_error_reset : 1002,
        store_error : 1003,
        fetch_error_reset : 1004,
        fetch_error : 1005
    },

};

module.exports = constants;
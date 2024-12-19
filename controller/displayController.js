const selectQuery = require("../constants.js/queries");
const db = require("../helper/querryRunner");

exports.displayitems = async (req, res) => {
    try {
        
        const [results] = await db.sequelize.query(selectQuery["selectQuery"]);
        const products = Array.isArray(results) ? results : [results];
        if (results.length === 0) {
            return res.status(200).json({
                message: "Items are not listed",
            });
        } else {
            console.log(products)
            return res.status(200).json(products);
        }
    } catch (error) {
        console.error("Error :", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
} 
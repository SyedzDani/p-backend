const { itemincrement, itemfind } = require("../constants.js/queries")
const db = require("../helper/querryRunner");
const {sequelize} = require("../config/dbconnection")
exports.increment = async (req, res) => {
    try {
        const { product_id, product_quantity } = req.body;
        if((!product_id)){
            return res.status(400).json({
                meessage:"Invalid request"
            })
        }
        const selectResult = await db.sequelize.query(
            'SELECT * FROM product_list WHERE product_id = ?',
            { replacements: [product_id], type: db.sequelize.QueryTypes.SELECT }
        );
            if (selectResult[0].length == 0) {
                return res.status(404).json({
                    message: "Item not found"
                });
            }
            const updateResult = await db.sequelize.query(
                'UPDATE product_list SET product_stock = product_stock + ? WHERE product_id = ?',
                { replacements: [product_quantity, product_id] }
            );
            return res.status(200).json({
                message: 'Stock updated',
            });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

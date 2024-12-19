const {itemdecrement, itemfind} = require("../constants.js/queries")
const db = require("../helper/querryRunner");

exports.decrement = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({
                message: "Invalid request: 'cart' is missing or not an array"
            });
        }
        for (const product of cart) {
            const { product_id, product_quantity } = product;
            if (!product_id || typeof product_id !== 'number' ||
                !product_quantity || typeof product_quantity !== 'number') {
                return res.status(400).json({
                    message: `Invalid product data in cart: ${JSON.stringify(product)}`
                });
            }
            const selectResult = await db.sequelize.query(
                'SELECT * FROM product_list WHERE product_id = ?',
                { replacements: [product_id], type: db.sequelize.QueryTypes.SELECT }
            );
            if (selectResult.length === 0) {
                return res.status(404).json({
                    message: `Item with product_id ${product_id} not found`
                });
            }
            const dbProduct = selectResult[0];
            const currentStock = dbProduct.product_stock;
            if (currentStock < product_quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for product_id ${product_id}`
                });
            }
            await db.sequelize.query(
                'UPDATE product_list SET product_stock = product_stock - ? WHERE product_id = ?',
                { replacements: [product_quantity, product_id] }
            );
        }
        return res.status(200).json({
            message: 'All products in cart updated successfully',
        });
    } catch (error) {
       
        console.error("Error during stock decrement:", error.stack);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


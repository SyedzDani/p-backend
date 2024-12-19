const postdiplay = require("./../constants.js/queries")
const db = require("../helper/querryRunner");

exports.postdiplay =  async (req,res) => {
    try {
        const [results] = await db.sequelize.query(postdiplay["postdisplay"])
        const posts = {};
        results.forEach(row => {
            const postId = row.post_id;
            if (!posts[postId]) {
                posts[postId] = {
                    post_id: postId,
                    post_content: row.post_content,
                    post_image : row.post_image,
                    comments: []
                };
            }
            if (row.comment_id !== null) {
                posts[postId].comments.push({
                    comment_id: row.comment_id,
                    comment_content: row.comment_content,
                    createdAt: row.comment_createdAt
                });
            }
        });
        const postsArray = Object.values(posts);   
        if (postsArray.length === 0) {
            return res.status(200).json({ message: "No post found" });
        }
        return res.status(200).json(postsArray);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.commentsdisplay = async (req, res) => {
    try {
        const { post_id } = req.query;
        if (!post_id || isNaN(post_id)) {
            return res.status(400).json({
                message: "Invalid request: post_id is required and must be a valid number."
            });
        }

        const query = `
            SELECT 
                comment_id,
                comment_content,
                createdAt AS comment_createdAt
            FROM
                comments
            WHERE
                post_id = ?
            ORDER BY
                createdAt ASC
        `;

        const [comments] = await db.sequelize.query(query, {
            replacements: [post_id],
            type: db.sequelize.QueryTypes.SELECT
        });
        if (comments.length === 0) {
            return res.status(200).json({
                message: "No comments found for the given post_id.",
                comments: []  
            });
        }
        return res.status(200).json(comments);

    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
};


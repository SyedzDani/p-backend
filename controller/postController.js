const db = require("../helper/querryRunner");

exports.postupdate = async (req, res) => {
    try {
        const { post_id, post_content } = req.body;
        if (!post_id || !post_content) {
            return res.status(400).json({
                message: "Invalid request"
            });
        }
        const [updatedRows] = await db.sequelize.query(
            'UPDATE posts SET post_content = ? WHERE post_id = ?',
            {
                replacements: [post_content, post_id]
            }
        );
        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        return res.status(200).json({
            message: "Post content updated successfully"
        });
    } catch (error) {
        console.error("Error updating post content:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.commentupdate = async(req,res) => {
    try {
        const { post_id, comment_content } = req.body;
        if (!post_id || !comment_content) {
            return res.status(400).json({
                message: "Invalid request"
            });
        }
        const [updatedRows] = await db.sequelize.query(
            'INSERT INTO comments (comment_content, post_id) VALUES (?, ?)',
            {
                replacements: [comment_content, post_id]
            }
        );
        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        return res.status(200).json({
            message: "comment content updated successfully"
        });
    } catch (error) {
        console.error("Error updating post content:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.postDelete = async (req, res) => {
    try {
        const { post_id } = req.body;

        if (!post_id) {
            return res.status(400).json({
                message: "Invalid request: post_id is required"
            });
        }
        await db.sequelize.query(
            'DELETE FROM comments WHERE post_id = ?',
            {
                replacements: [post_id]
            }
        );
        const [deletedRows] = await db.sequelize.query(
            'DELETE FROM posts WHERE post_id = ?',
            {
                replacements: [post_id]
            }
        );
        if (deletedRows === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        return res.status(200).json({
            message: "Post and associated comments deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



exports.commentdelete = async(req,res) =>{
    try {
        const { comment_id } = req.body;

        if (!comment_id) {
            return res.status(400).json({
                message: "Invalid request: comment_id is required"
            });
        }
        const [result] = await db.sequelize.query(
            'DELETE FROM comments WHERE comment_id = ?',
            {
                replacements: [comment_id],
            }
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
      
        console.error("Error deleting comment:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
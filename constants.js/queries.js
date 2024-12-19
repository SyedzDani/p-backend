exports.selectQuery = "SELECT * FROM product_list"

exports.itemincrement = 'UPDATE product_list SET product_stock = product_stock + +product_quantity+ WHERE product_id = +product_id',

exports.itemdecrement = 'UPDATE product_list SET product_stock = product_stock - product_quantity WHERE product_id =  + product_id'

exports.itemfind = 'SELECT * FROM product_list WHERE product_id = +product_id'

exports.postdisplay = `SELECT
p.post_id,
p.post_content,
p.post_image,
c.comment_id,
c.comment_content,
c.createdAt AS comment_createdAt
FROM
posts p
LEFT JOIN comments c ON p.post_id = c.post_id;`

exports.postupdate = "UPDATE posts SET post_content = 'New post content' WHERE post_id = 1"

exports.commentupdate = "UPDATE comments SET comment_content = 'New comment content' WHERE post_id = 1 AND comment_id = 1"

exports.postdelete = 'Delete * from posts WHERE post_id = ?'

exports.commentdelete = 'DELETE FROM comments WHERE post_id = 1 AND comment_id = 1'
const express = require('express');
const router = express.Router();
const  displayController = require('./../controller/displayController');
const incrementController = require('./../controller/incrementController');
const decrementController = require('./../controller/decrementController');
const postdiplayController = require('./../controller/postdisplayController');
const postController = require('./../controller/postController');
router.get('/getitems',displayController.displayitems);
router.patch('/itemupdate',incrementController.increment);
router.patch('/itemupdated',decrementController.decrement);
router.get('/postdisplay',postdiplayController.postdiplay);
router.post('/updatepost',postController.postupdate);
router.post('/updatecomment',postController.commentupdate);
router.delete('/delpost',postController.postDelete);
router.delete('/delcomment',postController.commentdelete);
router.get('/comments',postdiplayController.commentsdisplay)
module.exports = router;

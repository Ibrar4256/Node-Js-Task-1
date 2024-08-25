const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const accessControl = require('../middleware/accessControl');

router.post('/', blogController.createBlog);
router.get('/', blogController.getBlogs);
router.put('/:id', accessControl, blogController.updateBlog);
router.delete('/:id', accessControl, blogController.deleteBlog);

module.exports = router;

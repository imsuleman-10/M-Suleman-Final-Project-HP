const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('Admin'), getUsers);
router.delete('/:id', protect, restrictTo('Admin'), deleteUser);

module.exports = router;

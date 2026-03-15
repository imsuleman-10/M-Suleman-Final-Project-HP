const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, restrictTo('Instructor', 'Admin'), createCourse);
router.route('/:id').get(getCourseById).put(protect, restrictTo('Instructor', 'Admin'), updateCourse).delete(protect, restrictTo('Instructor', 'Admin'), deleteCourse);

module.exports = router;

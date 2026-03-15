const express = require('express');
const router = express.Router({ mergeParams: true });
const { enrollCourse, getMyCourses, updateProgress, toggleLessonCompletion, getAllEnrollments } = require('../controllers/enrollmentController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', protect, restrictTo('Student'), enrollCourse);
// We map /api/enroll to this. The requirement says GET /my-courses. We'll map it in server.js to /api/enroll/my-courses or similar
router.get('/my-courses', protect, restrictTo('Student'), getMyCourses);
router.get('/all', protect, restrictTo('Admin'), getAllEnrollments);
router.put('/progress', protect, restrictTo('Student'), updateProgress);
router.post('/toggle-completion', protect, restrictTo('Student'), toggleLessonCompletion);


module.exports = router;

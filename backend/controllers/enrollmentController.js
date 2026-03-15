const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (alreadyEnrolled) return res.status(400).json({ message: 'You are already enrolled in this course' });

    const enrollment = new Enrollment({
      student: req.user._id,
      course: courseId,
      progress: 0
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
                                        .populate('course')
                                        .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });

    if (enrollment) {
      enrollment.progress = progress;
      await enrollment.save();
      res.json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleLessonCompletion = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId }).populate('course');
    
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    const lessons = enrollment.course.lessons;
    if (lessons.length === 0) return res.status(400).json({ message: 'Course has no lessons' });

    const index = enrollment.completedLessons.indexOf(lessonId);
    if (index === -1) {
      enrollment.completedLessons.push(lessonId);
    } else {
      enrollment.completedLessons.splice(index, 1);
    }

    // Recalculate progress
    enrollment.progress = Math.round((enrollment.completedLessons.length / lessons.length) * 100);

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({}).populate('student', 'name email').populate('course', 'title');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollCourse, getMyCourses, updateProgress, toggleLessonCompletion, getAllEnrollments };

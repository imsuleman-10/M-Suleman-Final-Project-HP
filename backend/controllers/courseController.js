const Course = require('../models/Course');

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('instructor', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    
    // the user creating the course is the instructor
    const course = new Course({
      title,
      description,
      category,
      price,
      instructor: req.user._id
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { title, description, category, price, lessons } = req.body;
    const course = await Course.findById(req.params.id);

    if (course) {
      if (req.user.role === 'Instructor' && course.instructor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You can only edit your own courses' });
      }

      if (title !== undefined) course.title = title;
      if (description !== undefined) course.description = description;
      if (category !== undefined) course.category = category;
      if (price !== undefined) course.price = price;
      if (lessons !== undefined) course.lessons = lessons; // For adding/updating lessons

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      if (req.user.role === 'Instructor' && course.instructor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You can only delete your own courses' });
      }

      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };

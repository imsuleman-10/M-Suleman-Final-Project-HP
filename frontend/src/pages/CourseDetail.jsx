import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, ListGroup, Alert, ProgressBar, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { PlayCircle, CheckCircle, BookOpen, Clock, Tag, User } from 'lucide-react';
import api from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);

        // Check enrollment if user is Student
        if (user && user.role === 'Student') {
          const enrollmentsRes = await api.get('/enroll/my-courses');
          setMyCourses(enrollmentsRes.data);
          const userEnrollment = enrollmentsRes.data.find(e => e.course._id === id);
          if (userEnrollment) {
            setIsEnrolled(true);
            setEnrollment(userEnrollment);
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndEnrollment();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    setEnrollError('');
    try {
      const { data } = await api.post('/enroll', { courseId: id });
      setIsEnrolled(true);
      setEnrollment(data);
      // Give visual feedback or redirect to dashboard
      navigate('/student');
    } catch (err) {
      setEnrollError(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const toggleLesson = async (lessonId) => {
    try {
      const { data } = await api.post('/enroll/toggle-completion', { courseId: id, lessonId });
      setEnrollment(data);
    } catch (err) {
      console.error('Error toggling lesson completion', err);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (!course) return <Container className="py-5 text-center"><h2>Course not found</h2></Container>;

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col md={8}>
          <Badge bg="primary" className="mb-3 px-3 py-2 text-uppercase rounded-pill">{course.category}</Badge>
          <h1 className="fw-bolder display-5 mb-3">{course.title}</h1>
          <p className="lead text-muted mb-4">{course.description}</p>

          <div className="d-flex flex-wrap gap-4 text-muted small fw-semibold mb-4">
            <div className="d-flex align-items-center gap-2">
               <User size={18} className="text-primary"/> Instructor: {course.instructor?.name || 'Unknown'}
            </div>
            <div className="d-flex align-items-center gap-2">
               <BookOpen size={18} className="text-primary"/> {course.lessons?.length || 0} Lessons
            </div>
            <div className="d-flex align-items-center gap-2">
               <Tag size={18} className="text-primary"/> Category: {course.category}
            </div>
          </div>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-lg rounded-4 overflow-hidden position-sticky" style={{ top: '80px' }}>
             <div className="bg-light p-4 text-center border-bottom">
                 <h2 className="fw-bolder text-dark mb-0">${course.price}</h2>
             </div>
             <Card.Body className="p-4">
                 {enrollError && <Alert variant="danger" className="small rounded-3">{enrollError}</Alert>}
                 
                 {user?.role === 'Admin' || user?.role === 'Instructor' ? (
                     <div className="text-center text-muted small p-3 bg-light rounded-3 border">
                        As an {user.role}, you manage this course from your dashboard.
                     </div>
                 ) : isEnrolled ? (
                     <Button variant="success" className="w-100 rounded-pill py-3 fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2" disabled>
                        <CheckCircle size={20} /> Already Enrolled
                     </Button>
                 ) : (
                     <Button 
                       variant="primary" 
                       className="w-100 rounded-pill py-3 fw-bold shadow hover-lift" 
                       onClick={handleEnroll}
                       disabled={enrolling}
                     >
                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                     </Button>
                 )}

                 <hr className="my-4 text-muted" />
                 <h6 className="fw-bold mb-3">This course includes:</h6>
                 <ul className="list-unstyled text-muted small mb-0 d-flex flex-column gap-2">
                    <li className="d-flex align-items-center gap-2"><PlayCircle size={16}/> On-demand video lessons</li>
                    <li className="d-flex align-items-center gap-2"><BookOpen size={16}/> Comprehensive reading materials</li>
                    <li className="d-flex align-items-center gap-2"><Clock size={16}/> Full lifetime access</li>
                 </ul>
             </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
         <Col md={8}>
            <h3 className="fw-bold mb-4">Course Content</h3>
            {course.lessons && course.lessons.length > 0 ? (
                <ListGroup variant="flush" className="shadow-sm rounded-4 overflow-hidden border">
                {course.lessons.map((lesson, idx) => (
                    <ListGroup.Item key={idx} className="p-4 border-bottom d-flex align-items-start gap-3 bg-white hover-bg-light transition-all">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 mt-1">
                           <PlayCircle size={20} />
                        </div>
                        <div>
                           <h5 className="fw-semibold mb-1">Lesson {idx + 1}: {lesson.title}</h5>
                           {isEnrolled || user?.role === 'Instructor' || user?.role === 'Admin' ? (
                               <div className="mt-2 text-muted small">
                                 <p className="mb-2">{lesson.content || 'Content available for this lesson.'}</p>
                                 {lesson.videoUrl && (
                                   <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-1 text-primary fw-bold text-decoration-none border rounded px-2 py-1 bg-light">
                                      <PlayCircle size={14} /> Watch Video Lesson
                                   </a>
                                 )}
                                 {isEnrolled && user?.role === 'Student' && (
                                   <div className="mt-3">
                                      <Form.Check 
                                        type="checkbox"
                                        id={`lesson-${idx}`}
                                        label={enrollment?.completedLessons?.includes(lesson._id) ? "Lesson Completed" : "Mark as Completed"}
                                        checked={enrollment?.completedLessons?.includes(lesson._id) || false}
                                        onChange={() => toggleLesson(lesson._id)}
                                        className={enrollment?.completedLessons?.includes(lesson._id) ? "text-success fw-bold" : "text-primary"}
                                      />
                                   </div>
                                 )}
                               </div>
                           ) : (
                               <p className="text-muted small fst-italic mb-0">Enroll to view lesson details.</p>
                           )}
                        </div>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            ) : (
                <Card className="border border-dashed bg-light rounded-4 p-5 text-center shadow-none">
                    <BookOpen size={48} className="text-muted opacity-50 mx-auto mb-3" />
                    <h5 className="text-muted">Lessons are being prepared!</h5>
                    <p className="text-muted small mb-0">Check back soon for course curriculum updates.</p>
                </Card>
            )}
         </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;

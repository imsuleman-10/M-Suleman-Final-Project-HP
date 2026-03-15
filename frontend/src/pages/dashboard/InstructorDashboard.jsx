import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { PlusCircle, Edit3, Trash2, Video, Book } from 'lucide-react';
import api from '../../services/api';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '', price: 0 });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newLesson, setNewLesson] = useState({ title: '', videoUrl: '', content: '' });

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      const myCourses = data.filter(c => c.instructor?._id === user._id);
      setCourses(myCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', newCourse);
      setShowCreateModal(false);
      setNewCourse({ title: '', description: '', category: '', price: 0 });
      fetchCourses();
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course', error);
      }
    }
  };

  const openLessonModal = (course) => {
    setSelectedCourse(course);
    setNewLesson({ title: '', videoUrl: '', content: '' });
    setShowLessonModal(true);
  };

  const openEditModal = (course) => {
    setEditCourse(course);
    setShowEditModal(true);
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    if (!editCourse) return;
    try {
      await api.put(`/courses/${editCourse._id}`, {
        title: editCourse.title,
        description: editCourse.description,
        category: editCourse.category,
        price: editCourse.price
      });
      setShowEditModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Error updating course', error);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    try {
      const updatedLessons = [...(selectedCourse.lessons || []), newLesson];
      await api.put(`/courses/${selectedCourse._id}`, { lessons: updatedLessons });
      setShowLessonModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="shadow-sm border-0 rounded-4 text-center p-3 sticky-top" style={{ top: '20px' }}>
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold' }}>
              {user?.name?.charAt(0)}
            </div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <Badge bg="success" className="mt-2 text-uppercase letter-spacing-1 py-1 px-2">{user?.role}</Badge>
          </Card>
        </Col>
        
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3 className="fw-bold mb-0">Instructor Dashboard</h3>
            <Button variant="primary" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2" onClick={() => setShowCreateModal(true)}>
              <PlusCircle size={18} /> Create New Course
            </Button>
          </div>

          <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-bottom py-3 px-4">
              <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <Video size={20} className="text-secondary"/> Manage Your Courses
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <p className="text-center py-5 text-muted">Loading your courses...</p>
              ) : (
                <Table responsive hover className="mb-0 border-0">
                  <thead className="bg-light text-muted small text-uppercase">
                    <tr>
                      <th className="px-4 py-3 border-0">Course Title</th>
                      <th className="py-3 border-0">Category</th>
                      <th className="py-3 border-0">Price</th>
                      <th className="py-3 border-0 text-center">Lessons</th>
                      <th className="text-end px-4 py-3 border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length > 0 ? courses.map(course => (
                      <tr key={course._id} className="align-middle">
                        <td className="px-4 py-3 fw-semibold">
                          {course.title}
                        </td>
                        <td className="py-3"><Badge bg="secondary" text="light" className="border fw-normal">{course.category}</Badge></td>
                        <td className="py-3 fw-bold">${course.price}</td>
                        <td className="py-3 text-center">
                           <Badge bg={course.lessons?.length > 0 ? "success" : "light"} text={course.lessons?.length > 0 ? "light" : "dark"} className="rounded-pill">
                              {course.lessons?.length || 0}
                           </Badge>
                        </td>
                        <td className="text-end px-4 py-3">
                           <Button variant="light" size="sm" className="me-2 rounded-circle text-primary border" title="Add Lesson" onClick={() => openLessonModal(course)}>
                              <Book size={16}/>
                           </Button>
                           <Button variant="light" size="sm" className="me-2 rounded-circle text-info border" title="Edit Course" onClick={() => openEditModal(course)}>
                              <Edit3 size={16}/>
                           </Button>
                           <Button variant="light" size="sm" className="rounded-circle text-danger border" title="Delete Course" onClick={() => handleDeleteCourse(course._id)}>
                              <Trash2 size={16}/>
                           </Button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted bg-light">
                          <div className="mb-3"><Video size={48} className="opacity-25" /></div>
                          You haven't created any courses yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create Course Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCourse}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-muted">Course Title</Form.Label>
              <Form.Control type="text" className="bg-light border-0 py-2 rounded-3" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-muted">Description</Form.Label>
              <Form.Control as="textarea" rows={3} className="bg-light border-0 py-2 rounded-3" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required />
            </Form.Group>
            <Row>
              <Col md={6}>
                 <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-muted">Category</Form.Label>
                  <Form.Control type="text" className="bg-light border-0 py-2 rounded-3" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                 <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold text-muted">Price ($)</Form.Label>
                  <Form.Control type="number" min="0" className="bg-light border-0 py-2 rounded-3" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: parseFloat(e.target.value)})} required />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 fw-bold rounded-pill py-2 shadow-sm">Create Course</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal show={showLessonModal} onHide={() => setShowLessonModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Add Lesson to <span className="text-primary">{selectedCourse?.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddLesson}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-muted">Lesson Title</Form.Label>
              <Form.Control type="text" className="bg-light border-0 py-2 rounded-3" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-muted">Video URL (Optional)</Form.Label>
              <Form.Control type="url" placeholder="https://..." className="bg-light border-0 py-2 rounded-3" value={newLesson.videoUrl} onChange={e => setNewLesson({...newLesson, videoUrl: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold text-muted">Content / Transcript</Form.Label>
              <Form.Control as="textarea" rows={4} className="bg-light border-0 py-2 rounded-3" value={newLesson.content} onChange={e => setNewLesson({...newLesson, content: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 fw-bold rounded-pill py-2 shadow-sm">Upload Lesson</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCourse && (
            <Form onSubmit={handleEditCourse}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-muted">Course Title</Form.Label>
                <Form.Control type="text" className="bg-light border-0 py-2 rounded-3" value={editCourse.title} onChange={e => setEditCourse({...editCourse, title: e.target.value})} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-muted">Description</Form.Label>
                <Form.Control as="textarea" rows={3} className="bg-light border-0 py-2 rounded-3" value={editCourse.description} onChange={e => setEditCourse({...editCourse, description: e.target.value})} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                   <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted">Category</Form.Label>
                    <Form.Control type="text" className="bg-light border-0 py-2 rounded-3" value={editCourse.category} onChange={e => setEditCourse({...editCourse, category: e.target.value})} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                   <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-muted">Price ($)</Form.Label>
                    <Form.Control type="number" min="0" className="bg-light border-0 py-2 rounded-3" value={editCourse.price} onChange={e => setEditCourse({...editCourse, price: parseFloat(e.target.value)})} required />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="info" type="submit" className="w-100 fw-bold rounded-pill py-2 shadow-sm text-white">Save Changes</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default InstructorDashboard;

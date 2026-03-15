import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Nav, Tab, Badge, ProgressBar } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await api.get('/enroll/my-courses');
        setEnrollments(data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="shadow-sm border-0 rounded-4 text-center p-3 sticky-top" style={{ top: '20px' }}>
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold' }}>
              {user?.name?.charAt(0)}
            </div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <p className="text-muted small mb-0">{user?.email}</p>
            <Badge bg="info" className="mt-2 text-uppercase letter-spacing-1">{user?.role}</Badge>
          </Card>
        </Col>
        
        <Col md={9}>
          <Tab.Container id="student-tabs" defaultActiveKey="courses">
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
                <Nav variant="tabs" className="border-bottom-0 custom-tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="courses" className="fw-bold text-muted border-0 pb-3">My Courses</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className="fw-bold text-muted border-0 pb-3">Profile Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-4 bg-light bg-opacity-50 min-vh-50">
                <Tab.Content>
                  <Tab.Pane eventKey="courses">
                    <h4 className="fw-bold mb-4">Continuing Learning</h4>
                    {loading ? (
                       <p className="text-muted text-center pt-5">Loading courses...</p>
                    ) : (
                      <Row xs={1} md={2} className="g-4">
                        {enrollments.length > 0 ? enrollments.map(({ _id, course, progress }) => (
                          <Col key={_id}>
                            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                              <div className="bg-primary bg-opacity-10 p-3">
                                <Badge bg="primary">{course?.category}</Badge>
                              </div>
                              <Card.Body>
                                <Card.Title className="fw-bold">{course?.title}</Card.Title>
                                <Card.Text className="text-muted small border-bottom pb-3 mb-3">
                                  {course?.description?.substring(0, 80)}...
                                </Card.Text>
                                <div className="d-flex justify-content-between text-muted small mb-1">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <ProgressBar now={progress} variant="success" size="sm" className="mb-3" />
                                <Link to={`/courses/${course?._id}`}>
                                  <button className="btn btn-outline-primary btn-sm w-100 rounded-pill fw-bold">Resume Course</button>
                                </Link>
                              </Card.Body>
                            </Card>
                          </Col>
                        )) : (
                          <Col xs={12}>
                            <div className="text-center py-5 text-muted bg-white rounded-4 border">
                               You haven't enrolled in any courses yet.
                            </div>
                          </Col>
                        )}
                      </Row>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="profile">
                    <h4 className="fw-bold mb-4">Account Information</h4>
                    <Card className="border-0 shadow-sm rounded-4">
                      <Card.Body className="p-4">
                        <div className="mb-3">
                          <label className="text-muted small fw-bold">Full Name</label>
                          <p className="fs-5 mb-0">{user?.name}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted small fw-bold">Email Address</label>
                          <p className="fs-5 mb-0">{user?.email}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted small fw-bold">Account Role</label>
                          <p className="fs-5 mb-0">{user?.role}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;

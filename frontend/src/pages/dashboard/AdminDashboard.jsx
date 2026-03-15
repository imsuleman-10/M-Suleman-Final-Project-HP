import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Table, Badge, Button, ProgressBar, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { Users, BookOpen, Trash2, Shield, RefreshCcw, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
        api.get('/users'),
        api.get('/courses'),
        api.get('/enroll/all')
      ]);
      
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setEnrollments(Array.isArray(enrollmentsRes.data) ? enrollmentsRes.data : []);
    } catch (err) {
      console.error('Error fetching admin data', err);
      setError('Failed to load dashboard data. Please check your connection or permissions.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchData();
      } catch (err) {
        console.error('Error deleting user', err);
        alert('Failed to delete user.');
      }
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${id}`);
        fetchData();
      } catch (err) {
        console.error('Error deleting course', err);
        alert('Failed to delete course.');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p className="text-muted fw-bold">Loading System Overview...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4 pb-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="d-flex align-items-center gap-3">
             <div className="bg-danger text-white rounded-circle p-3 shadow-sm d-inline-flex">
                <Shield size={32} />
             </div>
             <div>
               <h2 className="mb-0 fw-bold">Admin Portal</h2>
               <p className="text-muted mb-0">System overview and management</p>
             </div>
          </div>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" className="rounded-pill px-3 py-2 d-flex align-items-center gap-2 shadow-sm" onClick={fetchData} disabled={refreshing}>
             <RefreshCcw size={18} className={refreshing ? 'spin' : ''} /> Refresh
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" className="rounded-4 shadow-sm mb-4 d-flex align-items-center gap-2"><AlertCircle size={20}/> {error}</Alert>}

      <Row className="mb-4 g-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 text-center p-4 h-100 hover-lift">
             <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                <Users size={18} /> Total Users
             </h6>
             <h1 className="fw-bolder display-4 mb-0 text-primary">{users.length}</h1>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 text-center p-4 h-100 hover-lift">
             <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                <BookOpen size={18} /> Total Courses
             </h6>
             <h1 className="fw-bolder display-4 mb-0 text-success">{courses.length}</h1>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 text-center p-4 h-100 hover-lift">
             <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                <RefreshCcw size={18} /> Enrollments
             </h6>
             <h1 className="fw-bolder display-4 mb-0 text-info">{enrollments.length}</h1>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 text-center p-4 h-100 hover-lift">
             <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                <Shield size={18} /> Admins
             </h6>
             <h1 className="fw-bolder display-4 mb-0 text-danger">
               {users.filter(u => u.role === 'Admin').length}
             </h1>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Tab.Container id="admin-tabs" defaultActiveKey="users">
            <Card className="shadow-sm border-0 rounded-4 mb-4 overflow-hidden border">
              <Card.Header className="bg-white border-bottom pt-3 pb-0 px-4">
                <Nav variant="tabs" className="border-bottom-0 custom-tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="users" className="fw-bold border-0 pb-3">User Management</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="courses" className="fw-bold border-0 pb-3">Course Management</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="analytics" className="fw-bold border-0 pb-3">Enrollment Analytics</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="users">
                    <Table responsive hover className="mb-0 border-0">
                      <thead className="bg-light text-muted small text-uppercase">
                        <tr>
                          <th className="px-4 py-3 border-0">Name</th>
                          <th className="py-3 border-0">Email</th>
                          <th className="py-3 border-0">Role</th>
                          <th className="text-end px-4 py-3 border-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id} className="align-middle">
                            <td className="px-4 py-3 fw-semibold">{u.name}</td>
                            <td className="py-3 text-muted">{u.email}</td>
                            <td className="py-3">
                              <Badge bg={u.role === 'Admin' ? 'danger' : u.role === 'Instructor' ? 'success' : 'primary'} className="rounded-pill px-2">
                                {u.role}
                              </Badge>
                            </td>
                            <td className="text-end px-4 py-3">
                              {u.role !== 'Admin' && (
                                <Button variant="light" size="sm" className="rounded-circle text-danger p-2 border" onClick={() => handleDeleteUser(u._id)} title="Remove User">
                                  <Trash2 size={16} />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="courses">
                     <Table responsive hover className="mb-0 border-0">
                      <thead className="bg-light text-muted small text-uppercase">
                        <tr>
                          <th className="px-4 py-3 border-0">Course Title</th>
                          <th className="py-3 border-0">Instructor</th>
                          <th className="py-3 border-0">Category</th>
                          <th className="text-end px-4 py-3 border-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(c => (
                          <tr key={c._id} className="align-middle">
                            <td className="px-4 py-3 fw-semibold">{c.title}</td>
                            <td className="py-3 text-muted">{c.instructor?.name || 'Unknown'}</td>
                            <td className="py-3"><Badge bg="secondary" text="light" className="fw-normal">{c.category}</Badge></td>
                            <td className="text-end px-4 py-3">
                                <Button variant="light" size="sm" className="rounded-circle text-danger p-2 border" onClick={() => handleDeleteCourse(c._id)} title="Remove Course">
                                  <Trash2 size={16} />
                                </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="analytics">
                      <Table responsive hover className="mb-0 border-0">
                        <thead className="bg-light text-muted small text-uppercase">
                          <tr>
                            <th className="px-4 py-3 border-0">Student</th>
                            <th className="py-3 border-0">Course</th>
                            <th className="py-3 border-0 text-center">Progress</th>
                            <th className="py-3 border-0 text-end px-4">Enrolled On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enrollments.map(e => (
                            <tr key={e._id} className="align-middle">
                              <td className="px-4 py-3 fw-semibold">
                                {e.student?.name || <span className="text-muted fw-normal fst-italic">Deleted User</span>}
                                <div className="text-muted small fw-normal">{e.student?.email || ''}</div>
                              </td>
                              <td className="py-3">{e.course?.title || <span className="text-muted fst-italic">Deleted Course</span>}</td>
                              <td className="py-3" style={{ minWidth: '150px' }}>
                                 <div className="d-flex align-items-center gap-2">
                                    <div className="flex-grow-1">
                                      <ProgressBar now={e.progress || 0} variant="info" style={{ height: '6px' }} className="rounded-pill" />
                                    </div>
                                    <span className="small fw-bold">{e.progress || 0}%</span>
                                 </div>
                              </td>
                              <td className="py-3 text-muted small text-end px-4">
                                {formatDate(e.createdAt)}
                              </td>
                            </tr>
                          ))}
                          {enrollments.length === 0 && (
                            <tr>
                              <td colSpan="4" className="text-center py-5 text-muted">No enrollments recorded yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>

      <style>{`
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </Container>
  );
};

export default AdminDashboard;

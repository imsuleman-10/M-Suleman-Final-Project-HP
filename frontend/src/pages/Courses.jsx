import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import api from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bolder mb-1">Explore Courses</h2>
          <p className="text-muted mb-0">Find the perfect course to advance your skills.</p>
        </div>
      </div>

      <Row className="mb-5 g-3">
        <Col md={8}>
          <InputGroup className="shadow-sm rounded-pill overflow-hidden bg-white border">
            <InputGroup.Text className="bg-white border-0 ps-4 pr-1 text-muted">
              <Search size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for courses..."
              className="border-0 shadow-none py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select 
            className="shadow-sm rounded-pill py-3 border-light bg-white text-muted"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCourses.map(course => (
            <Col key={course._id}>
              <Card className="h-100 shadow-sm border-0 rounded-4 hover-lift overflow-hidden">
                <div className="bg-primary bg-opacity-10 p-4 d-flex align-items-center justify-content-center text-primary" style={{ height: '150px' }}>
                    <BookOpen size={48} />
                </div>
                <Card.Body className="d-flex flex-column p-4">
                  <Badge bg="primary" className="align-self-start mb-3 text-uppercase">{course.category}</Badge>
                  <Card.Title className="fw-bold fs-5 mb-2">{course.title}</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {course.description.substring(0, 120)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="fw-bolder fs-5 text-dark">${course.price}</span>
                    <Link to={`/courses/${course._id}`}>
                        <Button variant="outline-primary" className="rounded-pill px-4 fw-bold">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-transparent border-top-0 px-4 py-3 text-muted small d-flex align-items-center gap-2">
                  <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '24px', height: '24px'}}>
                     {course.instructor?.name?.charAt(0) || 'U'}
                  </div>
                  {course.instructor?.name || 'Unknown Instructor'}
                </Card.Footer>
              </Card>
            </Col>
          ))}
          {filteredCourses.length === 0 && (
            <Col xs={12}>
                <div className="text-center py-5 text-muted bg-light rounded-4">
                    <Filter size={48} className="mb-3 text-secondary opacity-50"/>
                    <h5>No courses found matching your criteria.</h5>
                    <Button variant="link" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>Clear Filters</Button>
                </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Courses;

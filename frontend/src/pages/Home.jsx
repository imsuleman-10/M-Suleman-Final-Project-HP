import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlayCircle, Award, Users, BookOpen, Star, ArrowRight } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setFeaturedCourses(data.slice(0, 3)); // show top 3
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section bg-dark text-white py-5 position-relative overflow-hidden mb-5">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ background: 'linear-gradient(45deg, #0d6efd 0%, #000 100%)' }}></div>
        <Container className="position-relative z-1 py-5">
          <Row className="align-items-center py-5">
            <Col lg={7} className="text-center text-lg-start mb-5 mb-lg-0">
              <BadgeBox className="mb-3 d-inline-block p-2 bg-primary bg-opacity-25 rounded-pill text-info fw-bold small">
                <Star size={14} className="me-1 mb-1"/> Top Rated Platform 2026
              </BadgeBox>
              <h1 className="display-3 fw-bolder mb-4 leading-tight">
                Unlock Your Potential with <span className="text-primary">Industry-Leading</span> Skills.
              </h1>
              <p className="lead text-light mb-4 opacity-75 pe-lg-5">
                Elevate your career with comprehensive courses taught by real-world experts. 
                Whether you're starting fresh or looking to upskill, we have the perfect path for you.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/courses">
                  <Button variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow-lg d-flex align-items-center gap-2">
                    Explore Courses <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" size="lg" className="rounded-pill px-5 fw-bold">
                    Start Learning Free
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
               <div className="position-relative">
                 <div className="bg-primary bg-opacity-25 rounded-circle position-absolute top-50 start-50 translate-middle" style={{ width: '400px', height: '400px', filter: 'blur(50px)' }}></div>
                 <div className="glass-card p-4 rounded-4 shadow-lg border border-light border-opacity-10 position-relative z-1 bg-dark bg-opacity-50 backdrop-blur">
                    <h4 className="fw-bold mb-4 d-flex align-items-center gap-2"><PlayCircle className="text-primary"/> Active Learners</h4>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="d-flex position-relative">
                        <img src="https://i.pravatar.cc/100?img=1" alt="user" className="rounded-circle border border-dark border-3" width="45" style={{ zIndex: 3 }} />
                        <img src="https://i.pravatar.cc/100?img=2" alt="user" className="rounded-circle border border-dark border-3 position-absolute" width="45" style={{ left: '25px', zIndex: 2 }} />
                        <img src="https://i.pravatar.cc/100?img=3" alt="user" className="rounded-circle border border-dark border-3 position-absolute" width="45" style={{ left: '50px', zIndex: 1 }} />
                      </div>
                      <span className="ms-5 ps-3 text-light opacity-75 fw-bold small">+10k Students</span>
                    </div>
                    <hr className="border-secondary opacity-25" />
                    <div className="mt-4">
                       <p className="text-muted small mb-1">Weekly Success Rate</p>
                       <div className="progress rounded-pill bg-dark" style={{ height: '8px' }}>
                          <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{ width: '92%' }}></div>
                       </div>
                    </div>
                 </div>
               </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <Container className="mb-5 py-4">
         <Row className="g-4">
            <Col md={4}>
               <div className="text-center p-4 rounded-4 bg-white shadow-sm hover-lift border border-light">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                    <BookOpen size={28} />
                  </div>
                  <h2 className="fw-bolder fs-1 mb-1">500+</h2>
                  <p className="text-muted fw-semibold">High-Quality Courses</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="text-center p-4 rounded-4 bg-white shadow-sm hover-lift border border-light">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-success">
                    <Users size={28} />
                  </div>
                  <h2 className="fw-bolder fs-1 mb-1">20k+</h2>
                  <p className="text-muted fw-semibold">Global Community</p>
               </div>
            </Col>
            <Col md={4}>
               <div className="text-center p-4 rounded-4 bg-white shadow-sm hover-lift border border-light">
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-warning">
                    <Award size={28} />
                  </div>
                  <h2 className="fw-bolder fs-1 mb-1">98%</h2>
                  <p className="text-muted fw-semibold">Completion Rate</p>
               </div>
            </Col>
         </Row>
      </Container>

      {/* Featured Courses */}
      <section className="bg-light py-5">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder display-5 mb-3">Trending Courses</h2>
            <p className="text-muted mx-auto col-md-6">Hand-picked courses to help you stay ahead of the curve and master the most in-demand skills.</p>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {featuredCourses.map(course => (
                <Col key={course._id}>
                  <Card className="h-100 shadow-sm border-0 hover-lift rounded-4 overflow-hidden">
                    <div className="bg-primary bg-opacity-10 text-primary p-4 d-flex justify-content-center align-items-center" style={{ height: '160px' }}>
                       <BookOpen size={48} />
                    </div>
                    <Card.Body className="p-4 d-flex flex-column">
                      <span className="badge bg-primary bg-opacity-10 text-primary mb-3 align-self-start py-2 px-3 rounded-pill text-uppercase tracking-wider">{course.category}</span>
                      <Card.Title className="fw-bold fs-4 mb-3">{course.title}</Card.Title>
                      <Card.Text className="text-muted small flex-grow-1 leading-relaxed">
                        {course.description.substring(0, 120)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <span className="fw-bolder fs-4 text-dark">${course.price}</span>
                        <Link to={`/courses/${course._id}`}>
                             <Button variant="outline-primary" className="rounded-pill px-4 fw-bold shadow-sm hover-bg-primary hover-text-white transition-colors text-decoration-none">View Details</Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          <div className="text-center mt-5 pt-3">
             <Link to="/courses">
                <Button variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow">View All Courses <ArrowRight size={18} className="ms-2" /></Button>
             </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

// Helper component
const BadgeBox = ({ className, children }) => (
    <div className={className}>{children}</div>
);

export default Home;

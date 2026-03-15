import { Container, Row, Col, Card } from 'react-bootstrap';
import { Target, Users, BookOpen, Award } from 'lucide-react';

const About = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bolder display-4 mb-3">About <span className="text-primary">LMS Platform</span></h1>
        <p className="lead text-muted col-md-8 mx-auto">
          We are dedicated to providing accessible, high-quality education to learners worldwide. 
          Our platform bridges the gap between expert instructors and eager students, fostering a community of continuous growth.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm rounded-4 text-center hover-lift p-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
              <Target size={36} />
            </div>
            <h5 className="fw-bold">Our Mission</h5>
            <p className="text-muted small">To empower individuals through accessible, world-class educational resources and expert guidance.</p>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm rounded-4 text-center hover-lift p-4">
            <div className="bg-success bg-opacity-10 text-success rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
               <Users size={36} />
            </div>
            <h5 className="fw-bold">Expert Instructors</h5>
            <p className="text-muted small">Learn from industry professionals who bring real-world experience and deep insight into every course.</p>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm rounded-4 text-center hover-lift p-4">
            <div className="bg-warning bg-opacity-10 text-warning rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
               <BookOpen size={36} />
            </div>
            <h5 className="fw-bold">Diverse Catalog</h5>
            <p className="text-muted small">Explore a wide array of topics, from modern web development and data science to digital marketing.</p>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm rounded-4 text-center hover-lift p-4">
            <div className="bg-info bg-opacity-10 text-info rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
               <Award size={36} />
            </div>
            <h5 className="fw-bold">Recognized Quality</h5>
            <p className="text-muted small">Our curriculum is designed to meet industry standards, providing you with skills that employers value.</p>
          </Card>
        </Col>
      </Row>

      <Row className="align-items-center bg-light rounded-4 p-5 shadow-sm mt-5">
         <Col md={6} className="mb-4 mb-md-0">
            <h2 className="fw-bold mb-3">Our Vision for the Future</h2>
            <p className="text-muted">
              We envision a world where learning is not confined to physical classrooms or limited by geographical boundaries. 
              By utilizing modern technology, we are building an ecosystem where anyone, anywhere can learn the skills needed to shape their own future.
            </p>
            <p className="text-muted">
              Join thousands of students and instructors who are already making a difference globally.
            </p>
         </Col>
         <Col md={6}>
            <div className="bg-white p-4 rounded-4 shadow border text-center">
               <h3 className="fw-bold text-primary mb-2">10,000+</h3>
               <p className="text-muted text-uppercase small fw-bold tracking-wide">Active Learners</p>
               <hr />
               <h3 className="fw-bold text-success mb-2">500+</h3>
               <p className="text-muted text-uppercase small fw-bold tracking-wide">Expert Courses</p>
               <hr />
               <h3 className="fw-bold text-info mb-2">50+</h3>
               <p className="text-muted text-uppercase small fw-bold tracking-wide">Countries Reached</p>
            </div>
         </Col>
      </Row>
    </Container>
  );
};

export default About;

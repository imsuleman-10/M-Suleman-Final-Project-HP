import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, UserPlus, LogIn, BookOpen, Info, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'Admin') return '/admin';
    if (user.role === 'Instructor') return '/instructor';
    return '/student';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BsNavbar bg="white" expand="lg" className="mb-4 shadow-sm py-3 sticky-top border-bottom" style={{ zIndex: 1000}}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bolder fs-3 text-primary d-flex align-items-center gap-2">
           <div className="bg-primary text-white rounded p-1"><BookOpen size={24} /></div>
           LMS <span className="text-dark">Platform</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-2">
            <Nav.Link as={Link} to="/" className={`fw-semibold px-3 rounded-pill ${isActive('/') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark hover-bg-light'}`}>
              <HomeIcon size={16} className="me-1 mb-1"/> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className={`fw-semibold px-3 rounded-pill ${isActive('/courses') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark hover-bg-light'}`}>
              <BookOpen size={16} className="me-1 mb-1"/> Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`fw-semibold px-3 rounded-pill ${isActive('/about') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark hover-bg-light'}`}>
              <Info size={16} className="me-1 mb-1"/> About Us
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2 mt-3 mt-lg-0">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="text-decoration-none">
                  <Button variant={user.role === 'Admin' ? 'danger' : user.role === 'Instructor' ? 'success' : 'primary'} className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </Button>
                </Link>
                <Button variant="outline-secondary" className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2 border-0 bg-light hover-bg-danger hover-text-white" onClick={handleLogout}>
                   <LogOut size={16} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-decoration-none">
                   <Button variant="light" className="rounded-pill px-4 fw-bold text-dark border hover-bg-light d-flex align-items-center gap-2">
                      <LogIn size={16} /> Login
                   </Button>
                </Link>
                <Link to="/register" className="text-decoration-none">
                  <Button variant="primary" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2">
                      <UserPlus size={16} /> Register
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;

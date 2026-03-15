import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
      login(data, data.token);
      
      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Instructor') navigate('/instructor');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 mb-5">
      <Card style={{ width: '450px' }} className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>
          {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" className="rounded-3 bg-light border-0 py-2" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" className="rounded-3 bg-light border-0 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" className="rounded-3 bg-light border-0 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Role</Form.Label>
              <Form.Select className="rounded-3 bg-light border-0 py-2 text-muted" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Student">Student (Learn skills)</option>
                <option value="Instructor">Instructor (Teach others)</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 rounded-pill py-2 fw-bold shadow-sm" disabled={loading}>
              {loading ? 'Creating...' : 'Register'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="text-decoration-none fw-bold text-primary small">Login here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;

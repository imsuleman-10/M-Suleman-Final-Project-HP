import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data, data.token);
      
      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Instructor') navigate('/instructor');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Card style={{ width: '400px' }} className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
          {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                className="rounded-3 px-3 py-2 bg-light border-0"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                className="rounded-3 px-3 py-2 bg-light border-0"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 rounded-pill py-2 fw-bold shadow-sm" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="text-decoration-none fw-bold text-primary small">Register here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

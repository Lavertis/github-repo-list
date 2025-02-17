import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routing/AppRoutes.tsx';
import AppNavbar from './components/AppNavbar.tsx';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Container className="my-3">
        <AppRoutes />
      </Container>
    </Router>
  );
}

export default App;
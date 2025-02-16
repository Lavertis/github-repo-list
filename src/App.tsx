import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routing/AppRoutes.tsx";

function App() {
    return (
        <Router>
            <Container className="mt-5">
                <AppRoutes />
            </Container>
        </Router>
    );
}

export default App;
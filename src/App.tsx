import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routing/AppRoutes.tsx";

function App() {
    return (
        <Router>
            <Container className="my-2">
                <AppRoutes />
            </Container>
        </Router>
    );
}

export default App;
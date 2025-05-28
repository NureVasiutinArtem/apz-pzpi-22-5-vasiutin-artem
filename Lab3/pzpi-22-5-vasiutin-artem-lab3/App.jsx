import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import './App.css';
import "./i18next";

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
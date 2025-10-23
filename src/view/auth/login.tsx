import { Link } from "react-router-dom";
import { useAuth } from "../../auth/authcontext";

export default function LoginPage() {
    const { isAuthenticated, login, logout } = useAuth();

    const loginToggle = () => {
        if (isAuthenticated) {
            logout()
        }
        else {
            login("6666")
        }
    }

    return (<div>
        <h1>Click button to login</h1>
        <button onClick={loginToggle}>Login Toggle</button>
        <p>Is Login: {isAuthenticated ? 'Authenticated ✅' : 'Not Authenticated ❌'}</p>
        <Link to="/doc_auth">Test Auth wiht this link</Link>
    </div>);
}
import { Routes } from "react-router-dom";
import { AuthProvider } from "../auth/authcontext";
import AuthController from "./auth.controller";
import DocController from "./doc.controller";
import ErrorController from "./error.controller";

function MainController() {
    return (
        <AuthProvider>
            <Routes>
                {AuthController}
                {DocController}
                {ErrorController}
            </Routes>
        </AuthProvider>
    );
}

export default MainController;
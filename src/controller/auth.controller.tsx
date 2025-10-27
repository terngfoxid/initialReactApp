import { Route } from "react-router-dom";
import LoginPage from "../view/auth/login";

const AuthController = (
    <>
        <Route path="/login" element={<LoginPage/>} />
    </>
)

export default AuthController;
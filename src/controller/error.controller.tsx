import { Route } from "react-router-dom";
import Error404 from "../view/error/404";

const ErrorController = (
    <>
        <Route path="*" element={<Error404 />} />
    </>
)

export default ErrorController;
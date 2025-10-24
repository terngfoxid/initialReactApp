import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/protectroute";

const DocController = (
    <>
        <Route path="/doc" element={<div>Doc</div>
        } />
        <Route element={<ProtectedRoute />}>
            <Route path="/doc_auth" element={<div>Doc with Auth</div>} />
        </Route>
    </>
)

export default DocController;
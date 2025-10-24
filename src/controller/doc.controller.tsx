import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/protectroute";
import DocListPage from "../view/doc/doc-list";
import DocFormPage from "../view/doc/doc-form";

const DocController = (
    <>
        <Route path="/doc" element={<DocListPage/>} />
        <Route path="/doc/:mode" element={<DocFormPage/>} />
        <Route path="/doc/:mode/:id" element={<DocFormPage/>} />
        <Route element={<ProtectedRoute />}>
            <Route path="/doc_auth" element={<div>Doc with Auth</div>} />
        </Route>
    </>
)

export default DocController;
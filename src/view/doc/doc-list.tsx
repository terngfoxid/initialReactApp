import { useEffect, useState } from "react";
import { IDoc } from "../../model/doc.model";
import { Link } from "react-router-dom";
import DataTable from "../../share-component/datatable";

export default function DocListPage() {
    const [DocData, setDocData] = useState<IDoc[]>([]);

    useEffect(() => {
        const DocListBuffer: IDoc[] = []
        for (let a = 0; a < 10; a++) {
            const newItem: IDoc = {
                id: a + 1,
                name: "dec" + (a + 1),
                desc: "desc" + (a + 1),
                project: "project" + (a + 1),
                sub_doc: []
            }
            DocListBuffer.push(newItem)
        }
        setDocData(DocListBuffer)
    }, []);

    const deleteAtIndex = (index: number) => {
        setDocData(prevItems => {
            const newItems = prevItems.slice();
            newItems.splice(index, 1);
            return newItems;
        });
    }

    const deleteAtIndexCopy = (data: any, index: number) => {
        setDocData(prevItems => {
            const newItems = prevItems.slice();
            newItems.splice(index, 1);
            return newItems;
        });
    }

    return (<div>
        <h1>Doc List Page</h1>
        <Link to="/doc/add"><button>Add</button></Link>
        <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Project</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {DocData.map((doc, index) => {
                    return (
                        <tr key={"doc_" + index}>
                            <td>{(index + 1)}</td>
                            <td>{doc.name}</td>
                            <td>{doc.desc}</td>
                            <td>{doc.project}</td>
                            <td>
                                <Link to="/doc/view/1"><button>view</button></Link>
                                <Link to="/doc/edit/1"><button>edit</button></Link>
                                <button onClick={() => { deleteAtIndex(index) }}>delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div>
            <DataTable data={DocData} columns={[{
                header: "Name",
                key: "name",
                class: ""
            }, {
                header: "Description",
                key: "desc",
                class: ""
            }, {
                header: 'Custom Action',
                key: 'customAction',
                class: "",
                render: (row, index) => <div style={{display:"flex" ,justifyContent:"start"}}>
                    <button onClick={() => alert(row.name)}>Say Hi</button>
                </div>
            }]}
                showNo={true}
                currentPage={1}
                showAction={true}

                viewMode="redirect"
                viewRedirectTo={{
                    path: "/doc/view/",
                    key: "id",
                    queryParam: ["name", "project"]
                }}

                deleteFunction={deleteAtIndexCopy}
            />
        </div>
    </div>);
}
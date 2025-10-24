import { useParams } from "react-router-dom";
import { IDoc, ISubDoc } from "../../model/doc.model";
import { useEffect, useState } from "react";
import { SubDocEditor } from "./sub-doc-form";

type Params = {
    mode?: string;
    id?: string;
};

export default function DocFormPage() {
    const { mode, id } = useParams<Params>();
    const [DocData, setDocData] = useState<IDoc>({
        id: 0,
        name: null,
        desc: null,
        project: null,
        sub_doc: []
    });


    useEffect(() => {
        console.log(mode)
        if (mode === 'edit' || mode === 'view') {
            if (id) {
                setDocData({
                    id: 1,
                    name: "Doc 1",
                    desc: "Desc 1",
                    project: "Project 1",
                    sub_doc: [
                        {
                            id: 0,
                            name: "1",
                            desc: null,
                            sub_doc: [{
                                id: 0,
                                name: "1.1",
                                desc: null,
                                sub_doc: []
                            }]
                        },
                        {
                            id: 0,
                            name: "2",
                            desc: null,
                            sub_doc: []
                        }
                    ]
                })
            }
        }
    }, [mode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDocData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubDoc = () => {
        const newSubDoc: ISubDoc = { id: 0, name: null, desc: null, sub_doc: [] };
        setDocData((prev) => {
            return { ...prev, sub_doc: [...prev.sub_doc, newSubDoc] }
        });
    };

    const handleSubDocDelete = (index: number) => {
        const newSubs = DocData.sub_doc.filter((_, i) => i !== index);
        setDocData({ ...DocData, sub_doc: newSubs });
    };

    return (
        <div>
            <h1>Doc Form ({mode})</h1>
            <div>
                <div>
                    <label>Name: </label>
                    <span>{DocData.name}</span>
                </div>
                <input
                    type="text"
                    name="name"
                    value={DocData.name ?? ""}
                    onChange={handleChange}
                    disabled={mode !== 'add' && mode !== 'edit'}
                />
            </div>
            <div>
                <div>
                    <label>Description: </label>
                    <span>{DocData.desc}</span>
                </div>
                <textarea
                    name="desc"
                    value={DocData.desc ?? ""}
                    onChange={handleChange}
                    rows={3}
                    cols={30}
                    disabled={mode !== 'add' && mode !== 'edit'}
                />
            </div>
            <div>
                <div>
                    <label>Project: </label>
                    <span>{DocData.project}</span>
                </div>
                <input
                    type="text"
                    name="project"
                    value={DocData.project ?? ""}
                    onChange={handleChange}
                    disabled={mode !== 'add' && mode !== 'edit'}
                />
            </div>
            <h2>Sub Doc</h2>
            <button disabled={mode !== 'add' && mode !== 'edit'} onClick={handleAddSubDoc}>add Sub Doc</button>
            <div style={{ border: '1px solid', marginLeft: 'auto', marginRight: 'auto', width: '700px', minHeight: '30px' }}>
                {DocData.sub_doc.map((sd, i) => (
                    <SubDocEditor
                        key={"sub_doc_"+i}
                        subDoc={sd}
                        disabled={mode !== 'add' && mode !== 'edit'}
                        onChange={updatedSub => {
                            const newSubs = [...DocData.sub_doc];
                            newSubs[i] = updatedSub;
                            setDocData({ ...DocData, sub_doc: newSubs });
                        }}
                        onDelete={() => handleSubDocDelete(i)}
                    />
                ))}
            </div>
        </div>
    );
}
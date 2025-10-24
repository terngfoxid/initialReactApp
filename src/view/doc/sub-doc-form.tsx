import { ISubDoc } from "../../model/doc.model";

interface Props {
    subDoc: ISubDoc;
    disabled: boolean;
    onChange: (updated: ISubDoc) => void;
    onDelete: () => void;
}

export function SubDocEditor({ subDoc, disabled, onChange, onDelete }: Props) {
    const handleFieldChange = (field: keyof ISubDoc, value: string) => {
        onChange({ ...subDoc, [field]: value });
    };

    const handleAddNested = () => {
        const newNested: ISubDoc = { id: 0, name: null, desc: null, sub_doc: [] };
        onChange({ ...subDoc, sub_doc: [...subDoc.sub_doc, newNested] });
    };

    const handleNestedDelete = (index: number) => {
        const newList = subDoc.sub_doc.filter((_, i) => i !== index);
        onChange({ ...subDoc, sub_doc: newList });
    };

    return (
        <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "10px", marginBottom: "10px" }}>
            <input
                type="text"
                placeholder="SubDoc Name"
                value={subDoc.name??""}
                onChange={e => handleFieldChange("name", e.target.value)}
                disabled={disabled}
            />
            <input
                type="text"
                placeholder="Description"
                value={subDoc.desc??""}
                onChange={e => handleFieldChange("desc", e.target.value)}
                style={{ marginLeft: "5px" }}
                disabled={disabled}
            />
            <button onClick={handleAddNested} style={{ marginLeft: "5px" }}>
                + Add Sub Doc
            </button>
            <button onClick={onDelete} style={{ marginLeft: "5px", color: "red" }}>
                🗑 Delete
            </button>

            {subDoc.sub_doc.map((child, i) => (
                <SubDocEditor
                    key={"sub_doc_" + i}
                    subDoc={child}
                    disabled={disabled}
                    onChange={updatedChild => {
                        const newNestedList = [...subDoc.sub_doc];
                        newNestedList[i] = updatedChild;
                        onChange({ ...subDoc, sub_doc: newNestedList });
                    }}
                    onDelete={() => handleNestedDelete(i)}
                />
            ))}
        </div>
    );
}
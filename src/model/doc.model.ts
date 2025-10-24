export interface IDoc{
    id:number
    name:string|null
    desc:string|null
    project:string|null
    sub_doc:ISubDoc[]
}

export interface ISubDoc{
    id:number
    name:string|null
    desc:string|null
    sub_doc:ISubDoc[]
}
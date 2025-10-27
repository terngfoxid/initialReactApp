import React, { JSX } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  data: any[]
  columns: {
    header: string,
    key: string,
    class: string,
    render?: (row: any, rowIndex: number) => JSX.Element;
  }[]
  //Action
  showAction?: boolean

  showView?: boolean
  viewMode?: "function" | "redirect"
  viewRedirectTo?: {
    path: string
    key?: string
    queryParam?: string[]
  }

  showEdit?: boolean
  editMode?: "function" | "redirect"
  editRedirectTo?: {
    path: string
    key?: string
    queryParam?: string[]
  }

  showDelete?: boolean
  deleteMode?: "function" | "redirect"
  deleteRedirectTo?: {
    path: string
    key?: string
    queryParam?: string[]
  }

  showAdd?: boolean
  addMode?: "function" | "redirect"
  addRedirectTo?: string

  viewFunction?: (data: any,index:number) => any;
  editFunction?: (data: any,index:number) => any;
  deleteFunction?: (data: any,index:number) => any;
  addFunction?: (...args: any[]) => any;
  //Paging
  showNo?: boolean
  currentPage?: number
  itemPerPage?: number
}

export default function DataTable(
  { data, columns,
    showAction = false,
    showView = false, viewMode = "function", viewRedirectTo = {
      path: '',
      key: undefined,
      queryParam: undefined
    },
    showEdit = false, editMode = "function", editRedirectTo = {
      path: '',
      key: undefined,
      queryParam: undefined
    },
    showDelete = false, deleteMode = "function", deleteRedirectTo = {
      path: '',
      key: undefined,
      queryParam: undefined
    },
    showAdd = false, addMode = "function", addRedirectTo = "",
    viewFunction = (data: any,index:number) => { },
    editFunction = (data: any,index:number) => { },
    deleteFunction = (data: any,index:number) => { },
    addFunction = () => { },
    showNo = false,
    currentPage = 1,
    itemPerPage = 10
  }: Props) {

  const createURL = (
  rowIndex: number,
  urlOption: {
    path: string;
    key?: string;
    queryParam?: string[];
  }
) => {
  let url = urlOption.path.replace(/\/+$/, '');

  if (urlOption.key) {
    url += '/' + data[rowIndex][urlOption.key];
  }

  if (urlOption.queryParam && urlOption.queryParam.length > 0) {
    const queryString = urlOption.queryParam
      .map(param => `${param}=${encodeURIComponent(data[rowIndex][param])}`)
      .join('&');
    url += '?' + queryString;
  }

  return url;
};

  return (
    <table>
      <thead>
        <tr>
          {showAction && (<th>Action</th>)}
          {showNo && (<th>No.</th>)}
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {showAction && (<td>
              {
                viewMode === "function" ?
                  <button onClick={()=>viewFunction(row,rowIndex)}>view</button>
                  : <Link to={createURL(rowIndex,viewRedirectTo)}><button>view</button></Link>
              }
              {
                editMode === "function" ?
                  <button onClick={()=>editFunction(row,rowIndex)}>edit</button>
                  : <Link to={createURL(rowIndex,editRedirectTo)}><button>edit</button></Link>
              }
              {
                deleteMode === "function" ?
                  <button onClick={()=>deleteFunction(row,rowIndex)}>delete</button>
                  : <Link to={createURL(rowIndex,deleteRedirectTo)}><button>delete</button></Link>
              }
            </td>)}
            {showNo && (<td>{((currentPage - 1) * itemPerPage) + (rowIndex + 1)}</td>)}
            {columns.map((col) => (
              <td key={`data[${rowIndex}].${col.key}.`} className={col.class}>
                {col.render ? col.render(row, rowIndex) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ViewRecords = () => {

    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/products").then((posRes) => {
            const {data} = posRes;
            setRecords(data);
        },(errRes) => {
            console.log(errRes);
        })
    }, [records]);

    const add_record = () => {
        navigate("/add_record");
    }

    const delete_record = (id) => {
        axios.delete("http://localhost:8080/delete", {data:{"p_id":id}}).then((posRes) => {
            console.log(posRes);
        }, (errRes) => {
            console.log(errRes);
        })
    }

    const edit_record = (product) =>{
        const encodeImage = encodeURIComponent(product.p_image);
        navigate(`/edit_record/${product.p_id}/${product.p_name}/${product.p_cost}/${encodeImage}`);
    }

  return (
    <div>
      <table border={1} cellPadding={10} cellSpacing={5}>
        <thead>
            <tr>
                <th colSpan={6}>
                    <button onClick={add_record}>Add Record</button>
                </th>
            </tr>
            <tr>
                <th>P_Id</th>
                <th>P_Name</th>
                <th>P_Cost</th>
                <th>P_Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                records.map((element, index) => {
                    return(
                        <tr key={index}>
                            <td>{element.p_id}</td>
                            <td>{element.p_name}</td>
                            <td>{element.p_cost}</td>
                            <td>
                                <img src={element.p_image} width={50} ></img>
                            </td>
                            <td>
                                <i className='fa fa-edit' onClick={() => edit_record(element)}></i>
                            </td>
                            <td>
                                <i className='fa fa-trash' onClick={() => delete_record(element.p_id)}></i>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  )
}

export default ViewRecords;

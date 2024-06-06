import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddRecord = () => {

    const [record, setRecord] = useState({"p_id":0, "p_name":"", "p_cost":0, "p_image":""});

    const navigate = useNavigate();

    const func_one = (event) => {
        const {name, value} = event.target;
        setRecord({...record,[name]:value});
    }

    const save = () => {
        axios.post("http://localhost:8080/insert",record).then((posRes)=>{
            navigate("/");
        },(errRes)=>{
            console.log(errRes);
        });
        console.log(record);
    }

  return (
    <div>
      <fieldset>
        <legend>Add Mobile</legend>
        <p>Enter Mobile Id</p>
        <input type='number' value={record.p_id} name='p_id' onChange={func_one}></input>

        <p>Enter Mobile Name</p>
        <input type='text' value={record.p_name} name='p_name' onChange={func_one}></input>

        <p>Enter Mobile Cost</p>
        <input type='number' value={record.p_cost} name='p_cost' onChange={func_one}></input>

        <p>Enter Mobile Image</p>
        <input type='text' value={record.p_image} name='p_image' onChange={func_one}></input>
        <br/><br/>
        <button onClick={save}>Save</button>
      </fieldset>
    </div>
  )
}

export default AddRecord;

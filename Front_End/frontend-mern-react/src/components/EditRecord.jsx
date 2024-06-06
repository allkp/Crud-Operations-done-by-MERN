import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditRecord = () => {

    const {p_id, p_name, p_cost, p_image} = useParams();

    const navigate = useNavigate();

    const p_image1 = decodeURIComponent(p_image);

    const [product, setProduct] = useState({"p_id":p_id,"p_name":p_name,"p_cost":p_cost,"p_image":p_image1});

    const func_one = (event) => {
        const {name, value} = event.target;
        setProduct({...product, [name]:value});
    }

    const save = () => {
        axios.put("http://localhost:8080/update",product).then((posRes) => {
            navigate("/");
        }, (errRes) => {
            console.log(errRes);
        })
    }

  return (
    <div>
      <input type='number' name='p_id' value={product.p_id} disabled />
      <br/><br/>
      <input type='text' name='p_name' value={product.p_name} onChange={func_one} />
      <br/><br/>
      <input type='number' name='p_cost' value={product.p_cost} onChange={func_one} />
      <br/><br/>
      <input type='text' name='p_image' value={product.p_image} onChange={func_one} />
      <br/><br/>
      <button onClick={save}>Update</button>
    </div>
  )
}

export default EditRecord;

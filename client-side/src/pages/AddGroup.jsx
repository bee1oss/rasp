import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { useNavigate,Navigate } from 'react-router-dom';

export default function AddGroup() {

  const isAuth = useSelector(selectIsAuth);
  const [group_number,setGroup_number ] = useState()
  const [kurs,setKurs ] = useState()
  const [specialityId,setSpecialityId ] = useState()

  const navigate = useNavigate()

  const Submit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5555/create-group",{group_number,kurs,specialityId})
    .then(result=>{console.log(result)
      navigate('/groups')
    })
    .catch(err=>console.log(err))
  }

  const [specialities, setSpecialities] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/specialities")
    .then(specialities=>setSpecialities(specialities.data))
    .catch(err=>console.log(err))
  },[])
  
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Groups</strong>
      <form onSubmit={Submit}>      
        <div className="border-x border-gray-200 rounded-sm mt-2">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Специальност</th>
              <th>Курс</th>
              <th>Группа</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select onChange={(e) => setSpecialityId(e.target.value)}>
                  <option>--</option>
                {specialities.map(item => (
                  <option key={item._id} value={item._id}>{item.speciality}</option>
                ))}
              </select>
              </td>
              <td>
              <select onChange={(e) => setKurs(e.target.value)}>
                <option>--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              </td>
              <td>
              <input class="border-2 border-blue-500" onChange={(e) => setGroup_number(e.target.value)} />
              </td>
            </tr>  
          </tbody>
        </table>  
     
      </div>
       <button size="lg" class="bg-blue-500 text-white px-4 py-2 rounded-md justify-end">
          Add
      </button>
      </form>

    </div>
  );
};
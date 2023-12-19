import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function AddTeacher() {

  const [teacher,setTeacher ] = useState()


  const navigate = useNavigate()

  const Submit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5555/create-teacher",{teacher})
    .then(result=>{console.log(result)
      navigate('/teachers')
    })
    .catch(err=>console.log(err))
  }


  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Преподаватель</strong>
      <form onSubmit={Submit}>      
        <div className="border-x border-gray-200 rounded-sm mt-2">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ФИО</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <input class="border-2 border-blue-500" onChange={(e) => setTeacher(e.target.value)} />
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
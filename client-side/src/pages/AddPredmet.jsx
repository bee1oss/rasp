import axios from 'axios';
import React, { useState } from 'react';

import { selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { useNavigate,Navigate } from 'react-router-dom';
export default function AddPredmet() {

  const isAuth = useSelector(selectIsAuth);
  const [predmet,setPredmet ] = useState()

  const navigate = useNavigate()

  const Submit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5555/create-predmet",{predmet})
    .then(result=>{console.log(result)
      navigate('/anothers')
    })
    .catch(err=>console.log(err))
  }

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <strong className="text-gray-700 font-medium">Предмет</strong>
      <form onSubmit={Submit}>      
        <div className="border-x border-gray-200 rounded-sm mt-2">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Предмет</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <input class="border-2 border-blue-500" onChange={(e) => setPredmet(e.target.value)} />
              </td>
            </tr>  
          </tbody>
        </table>  
     
      </div>
       <button size="lg" class="bg-blue-500 text-white px-4 py-2 rounded-md justify-end">
          Add
      </button>
      </form>

    </>
  );
};
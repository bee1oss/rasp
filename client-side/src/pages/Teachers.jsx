import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Teachers() {
	const [teachers, setTeachers] = useState([])


  useEffect(()=>{
    axios.get("http://localhost:5555/teachers")
    .then(teachers=>setTeachers(teachers.data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Преподаватель</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(item => (
              <tr key={item._id}>
                <td>{item.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
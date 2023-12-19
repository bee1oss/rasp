import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Group() {
	const [groups, setGroups] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/groups")
    .then(groups=>setGroups(groups.data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Groups</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Курс</th>
              <th>Группа</th>
              <th>Специальност</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(item => (
              <tr key={item._id}>
                <td>{item.kurs}</td>
                <td>{item.group_number}</td>
                <td>{item.speciality.speciality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
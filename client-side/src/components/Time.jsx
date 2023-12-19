import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Time() {
	const [times, setTimes] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/times")
    .then(times=>setTimes(times.data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <>
      <strong className="text-gray-700 font-medium">Время</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            {times.map(item => (
              <tr key={item._id}>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    
  );
};
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Predmet() {
	const [predmets, setPredmets] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/predmets")
    .then(predmets=>setPredmets(predmets.data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <>
      <strong className="text-gray-700 font-medium">Предмет</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Предмет</th>
            </tr>
          </thead>
          <tbody>
            {predmets.map(item => (
              <tr key={item._id}>
                <td>{item.predmet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      </>
      
    
  );
};
import axios from 'axios';
import { selectIsAuth } from "../redux/slices/auth";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate,Navigate } from 'react-router-dom';

export default function AddRasp() {

  const [rows, setRows] = useState(1);
  const isAuth = useSelector(selectIsAuth);
  const [timeId,setTimeId ] = useState()
  const [dayId,setDayId ] = useState()
  const [predmetId,setPredmetId ] = useState()
  const [groupId,setGroupId ] = useState()
  const [teacherId,setTeacherId ] = useState()
  const [room,setRoom ] = useState()
  const [formData, setFormData] = useState([{ timeId: '', dayId: '', predmetId: '', groupId: '', teacherId: '', room: '' }]);

  const navigate = useNavigate()

  const Submit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5555/rasps",{timeId,dayId,predmetId,groupId,teacherId,room})
    .then(result=>{console.log(result)
      navigate('/layout')
    })
    .catch(err=>console.log(err))
  }

  const [times, setTimes] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/times")
    .then(times=>setTimes(times.data))
    .catch(err=>console.log(err))
  },[])

	const [predmets, setPredmets] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/predmets")
    .then(predmets=>setPredmets(predmets.data))
    .catch(err=>console.log(err))
  },[])

  const [teachers, setTeachers] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/teachers")
    .then(teachers=>setTeachers(teachers.data))
    .catch(err=>console.log(err))
  },[])

  const [groups, setGroups] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/groups")
    .then(groups=>setGroups(groups.data))
    .catch(err=>console.log(err))
  },[])
  const [days, setDays] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/days")
    .then(days=>setDays(days.data))
    .catch(err=>console.log(err))
  },[])
  
  
  const handleIncrease = () =>{
    setRows(rows + 1);
    setFormData([...formData, { timeId: '', dayId: '', predmetId: '', groupId: '', teacherId: '', room: '' }]);
  }

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
              <th>Время</th>
              <th>День</th>
              <th>Предмет</th>
              <th>Группа</th>
              <th>Преподаватель</th>
              <th>Кабинет</th>
            </tr>
          </thead>
          <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td>
                <select onChange={(e) => setTimeId(e.target.value)}>
                  <option>--</option>
                {times.map(item => (
                  <option key={item._id} value={item._id}>{item.time}</option>
                ))}
              </select>
              </td>
              <td>
                <select onChange={(e) => setDayId(e.target.value)}>
                  <option>--</option>
                {days.map(item => (
                  <option key={item._id} value={item._id}>{item.day}</option>
                ))}
              </select>
              </td>
              <td>
                <select onChange={(e) => setPredmetId(e.target.value)}>
                  <option>--</option>
                {predmets.map(item => (
                  <option key={item._id} value={item._id}>{item.predmet}</option>
                ))}
              </select>
              </td>
              <td>
                <select onChange={(e) => setGroupId(e.target.value)}>
                  <option>--</option>
                {groups.map(item => (
                  <option key={item._id} value={item._id}>{item.group_number}</option>
                ))}
              </select>
              </td>
              <td>
                <select onChange={(e) => setTeacherId(e.target.value)}>
                  <option>--</option>
                {teachers.map(item => (
                  <option key={item._id} value={item._id}>{item.teacher}</option>
                ))}
              </select>
              </td>
              <td>
              <input class="border-2 border-blue-500" onChange={(e) => setRoom(e.target.value)} />
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex justify-end">
          <button className="ml-auto bg-blue-500 text-white p-2 rounded" onClick={handleIncrease}>+1</button>
          </div>
          <button size="lg" class="bg-blue-500 text-white px-4 py-2 rounded-md justify-end">
            Add
          </button>
      </form>

    </div>
  );
};
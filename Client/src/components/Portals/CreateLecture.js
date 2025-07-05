import React, { useState, useEffect } from 'react';
import './index.css'
import ReactDOM from 'react-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateLecture = ({onClick}) => {

  useEffect(() => {
    fetchSubjects()
  },[])

  const navigate = useNavigate()
  const [user, setUser] = useState({}); 
  const [subject, setSubject] = useState();
  const [lecture, setLecture] = useState({
    lectureName: '',
    createdBy: sessionStorage.getItem('userId'),
    subject:''
  })

  
        


  const createLecture = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/lectures/create', lecture);
      const createdLecture = await response.data.lecture;
      console.log('Lecture created:', createdLecture);
    
      navigate('/admin/all-lectures')
    } catch (error) {
      
      document.getElementById('createerror').innerText = error
      console.error('Error creating lecture:', error);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(lecture);

    createLecture() 

  }


  

  const fetchSubjects = async () => {
    try {
      
      const response = await axios.get(`http://localhost:8080/api/sub/`); 
      const data = await response.data;

      setSubject(data);
      
    } catch (error) {
      console.error('Error fetching lecture details:', error);
    }
  };
  const handleChange = (e) =>{
    setLecture({...lecture,[e.target.name]:e.target.value})
    
  }


  return ReactDOM.createPortal(
    <>
      <div className='portal-container' onClick={onClick}></div>
      <div className='container create-cont'>
        <form className="create-container" onSubmit={handleSubmit} >
          <p>Lecture: <input type='text' required onChange={handleChange} value={lecture.lectureName} name='lectureName' /> </p>
          <select onChange={handleChange} required value={lecture.subject} name='subject'>
          <option value="">Select Subject</option>
            {subject && subject.map((item) => {
              return <option value={item._id} key={item._id}>{item.name}</option>;
            })}
          </select>
          <button type='submit'>Create</button>
        </form>
        <h1 id='createerror'></h1>
      </div>
    </>
    ,
    document.getElementById('portal')
  )
}

export default CreateLecture


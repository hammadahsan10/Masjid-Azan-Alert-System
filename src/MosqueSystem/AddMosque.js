import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Clock from 'react-live-clock';

const AddMosque = () => {

  const navigate = useNavigate()

  const [namee, setName] = useState("")
  const [location, setLocation] = useState("")
  const [city, setCity] = useState("")
  const clockRef = useRef(null);

  const SubmitAction = () => {

    let getCount = JSON.parse(localStorage.getItem("idcount")) || 0;
    let count = getCount + 1;

    const newMosque = {
      name: namee,
      location: location,
      city: city,
      id: count
    }

    localStorage.setItem("idcount", JSON.stringify(newMosque.id));
    let arr = JSON.parse(localStorage.getItem("MosqueDetails")) || [];
    arr.push(newMosque);
    localStorage.setItem("MosqueDetails", JSON.stringify(arr));
    navigate("/");
  }

  return (
    <div className='element'>

      <div style={{ fontWeight: "bold", fontSize: "18px", padding: "6px 10px" }}>
        <Clock ref={clockRef} format={'DD-MM-YYYY hh:mm:ss A'} ticking={true} />
      </div>

      <div className='headingCenter'>
            <h1 className='ml-4'>  Welcome to Mosque Alert System </h1>
          </div>

          <div style={{display:"flex", direction:'row', float:"right", backgroundColor:"none", marginRight:"1rem"}}>
          <button className='button-3' style={{ padding: "12px 22px", fontSize: "16px", backgroundColor: "red" }} onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>

      <div className="login-box">
        <h2> Add Mosque </h2>
        <br />

        <form>
          <div className="user-box">
            <input className='inputt' value={namee} onChange={(e) => setName(e.target.value)} />
            <label> Enter Mosque Name: </label>
          </div>
          <div class="user-box">
            <input className='inputt' value={location} onChange={(e) => setLocation(e.target.value)} />
            <label> Enter Your Location: </label>
          </div>

          <div class="user-box">
            <input className='inputt' value={city} onChange={(e) => setCity(e.target.value)} />
            <label> Enter Your City: </label>
          </div>

          {namee !== "" && location !== "" && city !== "" ?
            <a href="#" onClick={() => SubmitAction()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add Mosque
            </a>
            :
            null
          }


        </form>
      </div>
    </div>
  )
}

export default AddMosque

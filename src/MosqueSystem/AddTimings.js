import moment from 'moment';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTimings = ({ data }) => {

  const [fajr, setFajr] = useState("")
  const [zuhr, setZuhr] = useState("")
  const [asar, setAsar] = useState("")
  const [maghrib, setMaghrib] = useState("")
  const [isha, setIsha] = useState("")

  const SubmitActions = () => {

    const mosqueDetails = JSON.parse(localStorage.getItem("MosqueDetails")) || [];

    const updatedMosqueDetails = mosqueDetails.map(mosque => {
      if (mosque.id === data.id) {
        return {
          ...mosque,
          namazTimings: {
            fajr,
            zuhr,
            asar,
            maghrib,
            isha
          }
        }
      } else {
        return mosque;
      }
    });

    localStorage.setItem("MosqueDetails", JSON.stringify(updatedMosqueDetails));

    //For local storage Namaz Timings.
    const namazTiming = {
      name: data.name,
      location: data.location,
      city: data.city,
      id: data.id,
      fajr,
      zuhr,
      asar,
      maghrib,
      isha
    };

    let arr = JSON.parse(localStorage.getItem("namazTiming")) || [];
    arr.push(namazTiming);
    localStorage.setItem("namazTiming", JSON.stringify(arr));

    window.location.href = '/';

  }

  return (

    <div className="login-box2">
      <h2> Add Prayer Timings for {data.name} Mosque </h2>
      <br />
      <form>

        <div className="user-box">
          <label style={{color:"#03e9f4"}}> Enter Fajr Prayer Timing: </label>
        </div>
        <br />
        <br />
        <div className="user-box">
          <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className='Timings-Input' value={moment(fajr, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} onChange={(e) => setFajr(moment(e.target.value, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY HH:mm"))} />
        </div>

        <div className="user-box">
          <label style={{color:"#03e9f4"}}> Enter Zuhr Prayer Timing: </label>
        </div>
        <br />
        <br />
        <div className="user-box">
          <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className='Timings-Input' value={moment(zuhr, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} onChange={(e) => setZuhr(moment(e.target.value, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY HH:mm"))} />
        </div>

        <div className="user-box">
          <label style={{color:"#03e9f4"}}> Enter Asar Prayer Timing: </label>
        </div>
        <br />
        <br />
        <div className="user-box">
          <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className='Timings-Input' value={moment(asar, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} onChange={(e) => setAsar(moment(e.target.value, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY HH:mm"))} />
        </div>

        <div className="user-box">
          <label style={{color:"#03e9f4"}}> Enter Maghrib Prayer Timing: </label>
        </div>
        <br />
        <br />
        <div className="user-box">
          <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className='Timings-Input' value={moment(maghrib, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} onChange={(e) => setMaghrib(moment(e.target.value, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY HH:mm"))} />
        </div>

        <div className="user-box">
          <label style={{color:"#03e9f4"}}> Enter Isha Prayer Timing: </label>
        </div>
        <br />
        <br />
        <div className="user-box">
          <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className='Timings-Input' value={moment(isha, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} onChange={(e) => setIsha(moment(e.target.value, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY HH:mm"))} />
        </div>


        {fajr !== "" && zuhr !== "" && asar !== "" && maghrib !== "" && isha !== "" ?
          <a href="#" onClick={() => SubmitActions()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add Timings
          </a>
          :
          null
        }
      </form>
    </div>
  )
}

export default AddTimings

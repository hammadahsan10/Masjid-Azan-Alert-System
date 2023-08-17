import React, { useState, useRef, useEffect } from 'react'
import AddTimings from './AddTimings';
import Clock from 'react-live-clock';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MosqueDetails = () => {

  const navigate = useNavigate()
  const [alertBox, setAlertBox] = useState(false);
  const [time, setTime] = useState(new Date());
  const clockRef = useRef(null);

  const [showAddTimings, setShowAddTimings] = useState(false);
  const [mosqueData, setMosqueData] = useState("");
  const [alertMosqueName, setAlertMosqueName] = useState([]);
  const [alertPrayerName, setAlertPrayerName] = useState("");

  const [audio, setAudio] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current = new Audio("Bilal-i Habeşi'nin Son Ezanı.mp3");
  }, []);

  let getData = JSON.parse(localStorage.getItem("MosqueDetails")) || "";

  let fajr = []
  let zuhr = []
  let asar = []
  let maghrib = []
  let isha = []
  let masjidName = []

  getData !== "" && getData.map((curr) => {
    return (
      <>
        {curr.namazTimings ? (
          <span> {masjidName.push(curr.name)} {fajr.push(curr.namazTimings.fajr)} {zuhr.push(curr.namazTimings.zuhr)} {asar.push(curr.namazTimings.asar)} {maghrib.push(curr.namazTimings.maghrib)} {isha.push(curr.namazTimings.isha)}  </span>
        ) : (
          <span> null </span>
        )}
      </>
    )
  })

  const handleAddTimings = (data) => {
    setMosqueData(data);
    setShowAddTimings(true);
  };

  const TogglePlay = () => {

      audioRef.current.play().catch((error) => {});
  
    };

  const multipleEvents = (name) =>
  {
    setAlertBox(true)
    setAudio(true);
    setAlertMosqueName(name);
  }

  const formattedDate = moment(time).format("DD-MM-YYYY HH:mm");

  useEffect(() => {

    const intervalId = setInterval(() => {
      setTime(new Date());
  
      const matchingMosques = getData && getData.filter(currElement => {
        const namazTimings = currElement.namazTimings;
        if (namazTimings && namazTimings[alertPrayerName.toLowerCase()] === formattedDate) {
          return true;
        }
        return false;
      });
  
      const mosqueNames = matchingMosques && matchingMosques.map(currElement => currElement.name);
  
      setAlertMosqueName(mosqueNames.length > 0 ? mosqueNames : []);
  
      const mosquesWithConditionTrue = [];
  
      getData && getData.forEach(currElement => {
        if (currElement.namazTimings) {
          if (currElement.namazTimings.fajr === formattedDate) {
            mosquesWithConditionTrue.push(currElement.name);
            setAlertPrayerName("Fajr");
            multipleEvents(currElement.name);
            TogglePlay()
          } else if (currElement.namazTimings.zuhr === formattedDate) {
            mosquesWithConditionTrue.push(currElement.name);
            setAlertPrayerName("Zuhr");
            multipleEvents(currElement.name);
            TogglePlay()
          } else if (currElement.namazTimings.asar === formattedDate) {
            mosquesWithConditionTrue.push(currElement.name);
            setAlertPrayerName("Asar");
            multipleEvents(currElement.name);
            TogglePlay()
          } else if (currElement.namazTimings.maghrib === formattedDate) {
            mosquesWithConditionTrue.push(currElement.name);
            setAlertPrayerName("Maghrib");
            multipleEvents(currElement.name);
            TogglePlay()
          } else if (currElement.namazTimings.isha === formattedDate) {
            mosquesWithConditionTrue.push(currElement.name);
            setAlertPrayerName("Isha");
            multipleEvents(currElement.name);
            TogglePlay()
          }
        }
      });
  
      if (mosquesWithConditionTrue.length > 0) {
        setAlertMosqueName(mosquesWithConditionTrue);
      }
  
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [formattedDate]);

  var close = document.getElementsByClassName("closebtn");
  var i;

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.opacity = "0";
      setTimeout(function () { div.style.display = "none"; }, 600);
    }
  }

  return (

    <div className='element'>

      {alertBox ?  
        <div className="alert success">
          <span className="closebtn" >&times;</span>
            <strong>
              {alertPrayerName} Azan time starts in{" "}
              {alertMosqueName.length > 0
                ? alertMosqueName.join(" and ")
                : alertMosqueName.length === 1 ? <span> {alertMosqueName} </span> 
                : "No Mosques"}{" "}
              Mosque
            </strong>
            {/* <button className='audiobtn'onClick={TogglePlay}>{isPlaying ? "Pause" : "Play"} </button> */}
        </div>
        : 
        null
      }
     
      <div style={{fontWeight:"bold", fontSize:"18px", padding:"6px 10px"}}>
        <Clock ref={clockRef} format={'MMM DD, YYYY hh:mm:ss A'} ticking={true} />
      </div>

          <div className='headingCenter'>
            <h1 className=''>  Welcome to Mosque Alert System </h1>
          </div>

          <div style={{display:"flex", direction:'row', float:"right", backgroundColor:"none", marginRight:"1rem"}}>
            <button className='button-3' style={{padding:"12px 22px", fontSize:"16px"}} onClick={() => navigate("/addMosque")}> Add Mosque </button>
          </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      {showAddTimings ?  (
      <AddTimings data={mosqueData} />
      ) : (

  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Mosque Name</th>
          <th>Mosque Location</th>
          <th>City</th>
          <th>Namaz Timings</th>
          <th>Add Timings</th>
        </tr>
      </thead>
      <tbody>
        {getData !== "" ?
          getData.map((currElement) => {
            return (
              <tr key={currElement.id}>
                <td>{currElement.name}</td>
                <td>{currElement.location}</td>
                <td>{currElement.city}</td>
                <td>
                  
                  {currElement.namazTimings ? (
                    <span>
                      
                      {currElement.namazTimings.fajr !== "" ? (
                      <>
                        <div style={{fontSize:"15px", display:"flex", justifyContent:"center", margin:"6px" }}>
                          <span style={{ fontWeight: "bold" }}>Fajr: &nbsp;</span>
                          {moment(currElement.namazTimings.fajr, "DD-MM-YYYY HH:mm").format("MMM DD, YYYY hh:mm A")}
                        </div>
                      </>
                      ) : null} 

                      {currElement.namazTimings.zuhr !== "" ? (
                      <>
                        <div style={{fontSize:"15px", display:"flex", justifyContent:"center", margin:"6px"}}>
                          <span style={{ fontWeight: "bold" }}>Zuhr: &nbsp; </span>
                          {moment(currElement.namazTimings.zuhr, "DD-MM-YYYY HH:mm").format("MMM DD, YYYY hh:mm A")} 
                        </div>
                      </>
                      ) : null} 

                      {currElement.namazTimings.asar !== "" ? (
                      <>
                        <div style={{fontSize:"15px", display:"flex", justifyContent:"center", margin:"6px"}}>
                          <span style={{ fontWeight: "bold" }}>Asar: &nbsp; </span>
                          {moment(currElement.namazTimings.asar, "DD-MM-YYYY HH:mm").format("MMM DD, YYYY hh:mm A")} 
                        </div>
                      </>
                      ) : null} 

                      {currElement.namazTimings.maghrib !== "" ? (
                      <>
                        <div style={{fontSize:"15px", display:"flex", justifyContent:"center", margin:"6px"}}>
                          <span style={{ fontWeight: "bold" }}>Maghrib: &nbsp; </span>
                          {moment(currElement.namazTimings.maghrib, "DD-MM-YYYY HH:mm").format("MMM DD, YYYY hh:mm A")} 
                        </div>
                      </>
                      ) : null} 

                      {currElement.namazTimings.isha !== "" ? (
                      <>
                        <div style={{fontSize:"15px", display:"flex", justifyContent:"center", margin:"6px"}}>
                          <span style={{ fontWeight: "bold" }}>Isha: &nbsp; </span>
                          {moment(currElement.namazTimings.isha, "DD-MM-YYYY HH:mm").format("MMM DD, YYYY hh:mm A")}
                        </div>
                      </>
                      ) : null} 
                     
                    </span>
                  ) : (
                    <span>No Time Added for Prayers yet</span>
                  )}
                </td>
                <td>
                  <button className='button-3' onClick={() => handleAddTimings(currElement)}>
                    Add Namaz Timing
                  </button>
                </td>
              </tr>
            );
          }) : <div>
            </div>
            }
      </tbody>
    </table>
  </div>
)}

    </div>
  )
}

export default MosqueDetails

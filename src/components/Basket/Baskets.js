import "./basket.scss"
import React, { useEffect, useState } from "react";
import GetRequest from "../../API/GetRequest";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import deleteReq from "../../API/deleteReq";

const Baskets = () => {
  const [baskets, setbaskets] = useState([]);
  const [filteredbaskets, setfilteredbaskets] = useState([])
  const [error, seterror] = useState("");
  const [deleted, setdeleted] = useState(false);
  const [success, setsuccess] = useState(false)
  const [isLoading, setisLoading] = useState(true)


  const filterbaskets = (value) => {
    let fbaskets = baskets.filter(p => p.title.toLowerCase().includes(value.toLowerCase()))
    setfilteredbaskets(fbaskets)
  }
  useEffect(() => {
    GetRequest(`${process.env.REACT_APP_API_URI}/buckets`)
      .then((res) => {
        if (res.status === "ok") {
          setbaskets(res.data);
          setfilteredbaskets(res.data)
        } else {
          seterror(true);
          console.log(res);
        }
        setisLoading(false)
      })
      .catch((err) => {
        seterror(true);
        console.log(err);
        setisLoading(false)
      });
  }, [deleted]);


  if (isLoading) {
    return <div className="loader"></div>
  }


  const deleteBasket = (id) => {
    deleteReq(`${process.env.REACT_APP_API_URI}/bucket?id=${id}`).then((res) => {
      if (res.status === "ok") {
          setsuccess(true)
          console.log(res);
          setdeleted(`deleted ${id} successfully`)
      }
      else{
          seterror(true)
          console.log(res);
      }
    }).catch(error => {
        console.log(error);
        seterror(true)
    }).finally(e => {
        setTimeout(() => {
            seterror(false)
            setsuccess(false)
        }, 3000);
    })
    console.log("delted ||||||||||||||||||||||||");
  };



  if (error) {
    return (
      <div className="error">
        <h1>Something went wrong</h1>
      </div>
    );
  }



  return (
    <>
      <h1>All baskets</h1>
        {success && <div className="success">Basket Deleted Successfully</div> }
        {error && <div className="error">Something went wrong, please try again</div> }
      <input className="search" placeholder="Search baskets" onChange={e => filterbaskets(e.target.value)} type="search" />
      <div className="cardsContainer">
      {filteredbaskets.map((basket) => (
        <div key={basket._id} className="card">
          
          <div className="cardcol2">
            
                  <p>{basket.title}</p>
                  <p>{basket.description}</p>
             
             <div className="coins">
                 {basket.coins.map(coin => (
                    <div className="coin">
                        <img src={coin.img} alt={coin.name} />
                        <p className="value">{coin.value}%</p>
                    </div>
                 ))}
             </div>
            <div className="edit-delete-container">
              <Popup
                trigger={(open) => (
                  <div className="popup">
                    <FaTrash style={{ color: "red", fontSize: "25px", cursor: "pointer" }} />
                    {open ? "" : ""}
                  </div>
                )}
                closeOnDocumentClick
              >
                {(close) => (
                  <div className="popupContainer">
                    Are you sure to Delete this Basket ?<br />
                    <button
                      onClick={() => {
                        deleteBasket(basket._id, close);
                        close()
                      }}
                      className="cbtn yes"
                    >
                      Yes
                    </button>
                    <button onClick={close} className="cbtn no">
                      No
                    </button>
                  </div>
                )}
              </Popup>

              {/* <Link to={`/dashboard/edit-basket/${basket.slug}`}>
              <FaEdit style={{ color: "#000", fontSize: "25px", cursor: "pointer" }} />
              </Link>         */}
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Baskets;

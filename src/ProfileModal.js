import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

export default function ProfileModal({ onClose, login }) {
    
  const [modalDetails, setModalDetails] = useState();  
  
  // get the profile details for specified username
    useEffect(() => {
      // only fetch if login has been set

      if(login !== "") {
        fetch(`https://api.github.com/users/${login}`, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          return response.json()
        })
        .then((details) => {
          setModalDetails(details);
        })
      }
    }, [login]);
  
    
    
    return createPortal(
        <>
        { modalDetails && <>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {/* <h5 className="modal-title">Member Profile</h5> */}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="font-weight-bold">
                    {modalDetails.name}
                  </div>
                  <div className="d-flex">
                    followers: {modalDetails.followers}  |  following: {modalDetails.following}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        }
          
        </>,
        document.getElementById("modal-container")
        // since this is a portal, it will actually render in this location
    );
}
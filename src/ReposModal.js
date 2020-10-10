import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

export default function ReposModal({ onClose, url }) {
    
  const [modalDetails, setModalDetails] = useState();  
  
  // get the profile details for specified username
    useEffect(() => {
      // only fetch if login has been set

      if(url !== "") {
        fetch(url, {
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
    }, [url]);
  
    
    
    return createPortal(
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Repos</h5>
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
                    { modalDetails && modalDetails.map((repo) => {
                        return (
                            <div>
                                <p><a href={repo.html_url} target="_blank">{repo.name}</a></p>
                                <p>{repo.description}</p>
                                <hr/>
                            </div>
                        );
                    })
                    }
                </div>
              </div>
            </div>
          </div>
          </>,
        document.getElementById("modal-container")
        // since this is a portal, it will actually render in this location
    );
}
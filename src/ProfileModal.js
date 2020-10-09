import React from 'react';
import { createPortal } from "react-dom";

export default function ProfileModal({ onClose }) {
    
    // get the profile details for specified username
  function fetchProfileDetails(login) {
    fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response.json()
    })
      // .then((members) => {
      //     setMembers(members); 
      // });
  }
    
    
    return createPortal(
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Member Profile</h5>
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
                  <p>Are you sure you want to delete this issue?</p>
                </div>
                {/* <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onConfirm}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </>,
        document.getElementById("modal-container")
        // since this is a portal, it will actually render in this location
    );
}
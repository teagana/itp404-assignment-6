import React, { useState, useEffect } from 'react';
import './App.css';
import ProfileModal from './ProfileModal';

function App() {
  
  const [members, setMembers] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const [login, setLogin] = useState();


  // load list of members when page loads
  useEffect(() =>  {
    fetch("https://api.github.com/orgs/emberjs/members", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((members) => {
        setMembers(members); 
    });
  }, []);

  // functions for showing and hiding modal
  function showModal(login) {
    setLogin(login);
    setIsModalShown(true);
  }

  function hideModal() {
    setIsModalShown(false);
  }
  
  return (
    <>
      <div className="container">
      {isModalShown && <ProfileModal onClose={hideModal} login={login} />}

        {/* list of members */}
        {members && members.map((member) => {
          return (
            <div className="row d-flex justify-content-center mt-5 mb-5">
              <div className="col">
                <img src={member.avatar_url} onClick={() => showModal(member.login)} />
              </div>
              <div className="col">
                <p><span onClick={() => showModal(member.login)}>{member.login}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
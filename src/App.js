import React, { useState, useEffect } from 'react';
import './App.css';
import ProfileModal from './ProfileModal';
import ReposModal from './ReposModal';
import { unfollowMember, readMembers, followMember } from "./api";

function App() {
  
  const [members, setMembers] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const [login, setLogin] = useState();

  const [isReposModalShown, setIsReposModalShown] = useState(false);
  const [reposUrl, setReposUrl] = useState();

  const [followedMembers, setFollowedMembers] = useState();


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

        readMembers().then((followedMembers) => {
          setFollowedMembers(followedMembers);
        })

    });

  }, []);

  // functions for showing and hiding profile modal
  function showModal(login) {
    setLogin(login);
    setIsModalShown(true);
  }

  function hideModal() {
    setIsModalShown(false);
  }

  // functions for showing and hiding repos modal
  function showReposModal(url) {
    setReposUrl(url);
    setIsReposModalShown(true);
  }

  function hideReposModal() {
    setIsReposModalShown(false);
  }

  function clickedFollowButton(login) {

    // we're currently following; need to unfollow
    if(followedMembers.some(e => e.login === login)) {
      var unfollowId = followedMembers.find((member) => {
        return member.login === login;
      }).id;
      
      unfollowMember(unfollowId).then(() => {
        const filteredMembers = followedMembers.filter((member) => {
          return member.id !== unfollowId;
        });

        setFollowedMembers(filteredMembers);
      });
    }
    else { // currently not following; need to follow
      followMember(login).then((newFollowed) => {
        setFollowedMembers(followedMembers.concat(newFollowed));
      });
    }
  }
  
  return (
    <>
      <div className="container">
      {isModalShown && <ProfileModal onClose={hideModal} login={login} />}

      {isReposModalShown && <ReposModal onClose={hideReposModal} url={reposUrl} />}

        {/* list of members */}
        {(members && followedMembers) && members.map((member) => {
          return (
            <>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col">
                <img src={member.avatar_url} alt="" onClick={() => showModal(member.login)} />
              </div>
              <div className="col">
                <p><span onClick={() => showModal(member.login)}>{member.login}</span></p>
                <div>
                  <button type="button" className="btn btn-dark" onClick={() => showReposModal(member.repos_url, member.followStatus)}>repos</button>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mb-5 mt-2">
                <button type="button" className= "btn btn-primary follow" onClick={() => clickedFollowButton(member.login)}>{followedMembers.some(e => e.login === member.login) ? "unfollow" : "follow" }</button>
            </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;

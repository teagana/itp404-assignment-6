// fetches api data from db.json

// can differentiate based on login (unique)

// write members and their follow/unfollow status to db
// export function writeMembers(members) {
//     var count = 0;
//     var initializedMembers = members.map((member) => {
//         if(member.followStatus === undefined) {
//             var f = 0;
//         }
//         else {
//             var f = member.followStatus;
//         }
//         count++;

//         member.followStatus = f;
//         member.id = count;

//         return member;
//     });

//     return fetch("api/members", {
//         method: "POST",
//         body: JSON.stringify(initializedMembers),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         return response.json();
//     });

// }

// read all the members that are being followed currently
export function readMembers() {
    return fetch('/api/members').then((response) => {
        return response.json();
    });
}

// add a member (follow)
export function followMember(login) {
    return fetch('/api/members', {
        method: "POST",
        body: JSON.stringify({
            login
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    });
}

// delete a member (unfollow)
export function unfollowMember(id) {
    return fetch(`/api/members/${id}`, {
        method: 'DELETE'
    });
}

// flip the following status of the specified member
// export function flipStatus(id, followStatus) {
//     // var f = Number(followStatus) ? '0' : '1';
//     // console.log(f);
    
//     return fetch(`/api/members/${id}`, {
//         method: "PATCH",
//         // flip the status that comes in
//         body: JSON.stringify({
//             followStatus: Number(followStatus) ? 0 : 1
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         return response.json();
//     })
// }

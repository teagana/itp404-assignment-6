// fetches api data from db.json

// can differentiate based on login (unique)

// write members and their follow/unfollow status to db
export function writeMembers(members) {
    var count = 0;
    var initializedMembers = members.map((member) => {
        if(member.followStatus === undefined) {
            var followStatus = 0;
        }
        else {
            var followStatus = member.followStatus;
        }
        count++;

        member.followStatus = followStatus;
        member.id = count;

        console.log(member);

        return member;
        
        // return ({
        //     id: count,
        //     login: member.login,
        //     followStatus: followStatus
        // });
    });

    return fetch("api/members", {
        method: "POST",
        body: JSON.stringify(initializedMembers),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    });

}

// read all the members and their status from the db
export function readMembers() {
    return fetch('/api/members').then((response) => {
        return response.json();
    });
}

// flip the following status of the specified member
export function flipStatus(login) {

}

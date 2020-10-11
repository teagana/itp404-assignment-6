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

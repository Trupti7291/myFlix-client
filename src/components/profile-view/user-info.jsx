import React from "react";

function UserInfo({ name, email }) {
    return (
        <>
            <h4> Your Info </h4>
            <p>Name: {name}</p>
            <p>e-mail: {email} </p>
        </>
    )
}
export default UserInfo
import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const UserItem = ({ user: {
    userName,
    email,
    role,
    license_number,
} }) => {
    return (
        <Fragment>
            {role == "admin" ? "" : role == "ret" ? <Link to={`/graph/${email}`}> <div style={card_style} className="bg-light">
            <div>
                <h3>{userName && <span>Username : {userName}</span>}</h3>
                <p className="my-1">{email && <span>Email ID : {email}</span>}</p>
                <p>{role && <span>Role : {role == "man" ? "Manufacturer" : role == "dist" ? "Distributor" : "Retailer" }</span>}</p>
                <p className="my-1">{license_number && <span>License Number : {license_number}</span>}</p>
            </div>
        </div> </Link> : <div style={card_style} className="bg-light">
            <div>
                <h3>{userName && <span>Username : {userName}</span>}</h3>
                <p className="my-1">{email && <span>Email ID : {email}</span>}</p>
                <p>{role && <span>Role : {role == "man" ? "Manufacturer" : role == "dist" ? "Distributor" : "Retailer" }</span>}</p>
                <p className="my-1">{license_number && <span>License Number : {license_number}</span>}</p>
            </div>
        </div>}
        </Fragment>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

const card_style = {
padding : "16px",
testAlign : "center",
}

export default UserItem
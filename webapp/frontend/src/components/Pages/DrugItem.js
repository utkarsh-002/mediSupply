import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from "react-router-dom"

const DrugItem = ({ drug: {
    drugId,
    man,
    name
} }) => {
    return (
        <div>
            <div className = "card-6">
                <p><strong> Drug id : </strong>  {drugId} </p>
                <p><strong> Manufacturer : </strong>{man}</p>
                <p><strong> Drug Name : </strong> {name}</p>
            </div>
        </div>
    )
}

DrugItem.propTypes = {
    drug: PropTypes.object.isRequired,
}

export default DrugItem
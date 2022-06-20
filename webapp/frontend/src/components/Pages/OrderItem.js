import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from "react-router-dom"

const OrderItem = ({ order: {
    orderId,
    drugId,
    quantity,
    currentOwner,
    status
} }) => {
    return (
        <div>
            <div className = "card-6">
                <p><strong> Order id : </strong>  {orderId} </p>
                <p><strong> Drug id : </strong>  {drugId} </p>
                <p><strong> Quantity : </strong>{quantity}</p>
                <p><strong> Current Owner : </strong> {currentOwner == "M" ? "Manufacturer" : currentOwner == "D" ? "Distributor" : currentOwner == "R" ? "Retailer": "Consumer"}</p>
                <p><strong> Status : </strong>  {status} </p>
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

export default OrderItem
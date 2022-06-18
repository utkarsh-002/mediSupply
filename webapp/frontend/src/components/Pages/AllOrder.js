import React,{useEffect,Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllOrder } from "../../actions/order";
import OrderItem from "./OrderItem";

const AllOrder = ({order:{orders,loading},getAllOrder}) => {
  // console.log()
  
  useEffect(() => {
    getAllOrder()
  }, [])

  // loading?console.log("No drugs"):console.log(drugs)


  return (
    <section className="container">
        {/* <h1>All Drugs</h1> */}
        <Fragment>
            {loading ? <p className="lead">Orders loading.....</p> : <Fragment>
                <p className="lead">
                    { ' ' } Browse Available Orders{/* Muski scan karti hai */}
                </p>
                <div className="profiles">
                    {orders.length > 0 ? (orders.map(order=> (<OrderItem key={order._id} order={order} />))) :
                        <h4>No Order Found...</h4>}
                </div>
            </Fragment>}
        </Fragment>    
    </section>
  )
  
}

AllOrder.propTypes = {
  orders: PropTypes.object.isRequired,
  getAllOrder : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  order : state.order,
})

export default connect(mapStateToProps, {getAllOrder})(AllOrder);
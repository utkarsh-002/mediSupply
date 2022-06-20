import React,{useEffect,Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUser } from "../../actions/user";
import UserItem from "./UserItem";

const AllUser = ({user:{users,loading},getAllUser}) => {
  // console.log()
  
  useEffect(() => {
    getAllUser()
  }, [])


  return (
    <section className="container">
        {/* <h1>All Drugs</h1> */}
        <Fragment>
            {loading ? <p className="lead">Users loading.....</p> : <Fragment>
                <p className="lead">
                    { ' ' } Browse Available Users
                </p>
                <div className="profiles" style={profile_display}>
                    {users.length > 0 ? (users.map(user => (<UserItem key={user._id} user={user} />))) :
                        <h4>No User Found...</h4>}
                </div>
            </Fragment>}
        </Fragment>    
    </section>
  )
  
}

AllUser.propTypes = {
  users: PropTypes.object.isRequired,
  getAllUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user : state.user,
})

const profile_display = {
  boxShadow: "0 0.1rem 0 0 rgba(0, 0, 0, 0.1)",
  margin: "0 auto",
  display: "grid",
  maxWidth: "1200px",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gridAutoRows: "200px",
  gridGap:"20px",
  paddingBottom: "70px"
}


export default connect(mapStateToProps, {getAllUser})(AllUser);
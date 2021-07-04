import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import DashboardActions from "./DashboardActions"
import { connect } from "react-redux";



const Dashboard = ({ auth: { user }}) => {

    return <Fragment>
      <section className="container">
      <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user' /> Welcome {user && user.userName}
        </p>
        <br/>
                <Fragment>
                    <DashboardActions  role={user.role}/>
                </Fragment>
      </section> 
    </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps,{})(Dashboard)
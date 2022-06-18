import React, { Fragment, useState, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getDataByEmail } from "../../actions/data";
import PieItem from "./PieItem";

const Graph = ({
  match,
  getDataByEmail,
  data,
}) => {
  const email_id = match.params.id
  useEffect(() => {
    getDataByEmail(email_id)
  }, [getDataByEmail, match.params.id])

  return (
    <section className="container">
      <Fragment>
      {data === null || data.loading ? (
        <p className="lead">Graph loading.....</p>
      ) : <PieItem dataGraph = {data}></PieItem>}
    </Fragment>
    </section>
    
  )
}

Graph.propTypes = {
  getDataByEmail: PropTypes.func.isRequired,
  data : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data : state.data,
})


export default connect(mapStateToProps, { getDataByEmail })(Graph)
import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieItem = ({ dataGraph }) => {
    let data = {
        labels: ['Valid Prescription', 'Invalid Prescription'],
        datasets: [
          {
            label: '# of Prescription',
            data: [dataGraph.data.valid,dataGraph.data.invalid],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <Fragment>
            <Pie style={graph_style} data={data} />
        </Fragment>
    )
}

const graph_style = {
    width : "500px",
    height : "500px",
    margin : "100px auto"
    }

PieItem.propTypes = {
    dataGraph: PropTypes.object.isRequired,
}


export default PieItem
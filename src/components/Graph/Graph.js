import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { Line, Bar } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => ({
    graphData: state.graph.graphReducer
})

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {}
        }
    }
    setGraphWithData = () => {
        let mood = this.props.graphData.mood;
        let days = [];
        let hydro = this.props.graphData.hydration;
        let fit = this.props.graphData.fitness;
        let nutri = this.props.graphData.nutrition;
        console.log(mood, days);
        for (let entry of this.props.graphData.date) {
            days.push(moment(entry).format('ddd MMM D'));
        }
        // console.log(mood,days,);
        this.setState({
            chartData: {
                labels: days,
                datasets: [
                    {
                        label: 'Mood',
                        data: mood,
                        borderColor: '#35DDFF',
                        backgroundColor: '#35DDFF',
                        fill: false,
                        borderWidth: '2px'
                    },
                    {
                        label: 'Hydration',
                        data: hydro,
                        borderColor: '#8E43E8',
                        backgroundColor: '#8E43E8',
                        fill: false,
                        borderWidth: '2px'
                    },
                    {
                        label: 'Fitness',
                        data: fit,
                        borderColor: '#FF6886',
                        backgroundColor: '#FF6886',
                        fill: false,
                        borderWidth: '2px'
                    },
                    {
                        label: 'Nutrition',
                        data: nutri,
                        borderColor: '#46E895',
                        backgroundColor: '#46E895',
                        fill: false,
                        borderWidth: '2px'
                    },
                    {
                        label: 'Migraine',
                        data: [0, 0, 0, 6, 0, 0, 0],
                        borderColor: '#FFD32F',
                        backgroundColor: '#FFD32F',
                    }
                ]
            }

        })
    }

    componentWillMount() {
        this.getData();
    }


    getData = () => {
        axios({
            method: "GET",
            url: '/api/graph'
        }).then((response) => {
            //console.log('Where is my log', response.data);
            let action = { type: 'SET_GRAPH_DATA', payload: response.data }
            this.props.dispatch(action);
            this.setGraphWithData();
        }).catch((error) => {
            console.log('Error getting graph data', error);
            alert('Error getting graph data', error)
        })
    }

    render() {
        return (
            <Paper>
                <Nav />
                <div>
                    <Line
                        data={this.state.chartData}
                        options={{
                            title: {
                                display: true,
                                text: 'My Daily Check-ins',
                                fontSize: 25
                            },
                            legend: {
                                position: 'bottom'
                            },
                        }}
                        height={400}
                    // width={1200}

                    />
                </div>
            </Paper>
        )
    }
}//class

export default connect(mapStateToProps)(Chart);
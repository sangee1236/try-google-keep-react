import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/ListActions';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import Header from '../components/Header';
import * as selector from '../reducers/ListReducers';

class Spendings extends Component {
    state = {
        barData: this.populateBar(),
        douData: this.populateDou()
    };

    populateBar() {
        
        let labels = this.props.lists.map(list=> {
            if(list.status === 'active'){
                return list.title;
            }
        });
        let data = this.props.lists.map(list=> {
            if(list.status === 'active'){
                return list.items.length;
            }} );
        console.log("lists",labels, data);
        return {
            labels: labels,
            datasets: [
                {
                    label: 'My Lists',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data
                }
            ]
        }
    }

    populateDou(){
        let labels = this.props.lists.map(list=> {
            if(list.status === 'active'){
                return list.title;
            }
            return null;
        });
        labels = labels.filter(list => list != null);
        let data = this.props.lists.map(list=> {
            if(list.status === 'active'){
                var length = 0;
                list.items.map(itemId => {
                    if(this.props.items[itemId].status === 'active'){
                        length++;
                    }
                })
                return length;
            }
            return null;
        });
        data = data.filter(list => list != null);

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        }
    }

    componentDidMount() {
        console.log(this.refs.doughNutchart.chart_instance);
        // console.log(this.refs.barChart.chart_instance);
    }
    render() {
        return (
            <div>
                <Header />
                <div className="main-content">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="card-panel white">
                                    <Doughnut
                                        ref="doughNutchart"
                                        data={this.state.douData}
                                    />
                                </div>
                            </div>

                            {/* <div className="col s12 m6">
                                <div className="card-panel white">
                                    <Bar                                        
                                        data={this.state.barData}
                                        ref="barChart"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lists: selector.getAllList(state),
        items: state.entities.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: email => {
            dispatch(getUser(email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spendings);

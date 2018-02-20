import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUser} from '../actions/ListActions'


class Signin extends Component {
    constructor(){
        super();
        localStorage.clear();
    }
  
  render() {
        return (
            <div className="row">
                <div className="col s12 m4 offset-m4">
                    <div className="card-panel white">
                    <div className="input-field">
                        <form id="signIn" onSubmit={(e)=>{
                            e.preventDefault();
                            const email = this.input.value;
                            this.props.onGetUser(email);
                            setTimeout(() => {
                                this.props.history.push('dashboard');
                            }, 1000);
                           
                        }} >
                            <input id="email" type="email" className="validate" 
                            ref={input => (this.input = input)}/>
                            <label htmlFor="email">Email</label>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: email => {
            dispatch(getUser(email));
        }
    };
};

export default connect(null, mapDispatchToProps)(Signin);
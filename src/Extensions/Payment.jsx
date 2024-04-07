/* global Paddle */

import React, { Component } from 'react';
import { connect } from "react-redux";
class Payment extends Component {
    
    componentDidMount() {
        if (!window.Paddle) {
            const script = document.createElement('script');
            script.src = 'https://cdn.paddle.com/paddle/paddle.js';
            script.async = true;
            document.body.appendChild(script);
            
            script.onload = () => {
                Paddle.Setup({ vendor: 18450 }); // vendor id
            };
        }
    }

    handleCheckout = () => {
        const { user } = this.props;
        console.log(user)
        var itemsList = [
            {
              priceId: 'pri_01htsnx0e1rmr833bp817jk0wx', // free plan id
              quantity: 1
            }
          ];
        Paddle.Checkout.open({
            product_id : "pro_01htsjz2wakw48mp5g2r9449y7",
            settings: {
              displayMode: "overlay",
              theme: "light",
              locale: "en",
            },
            items: itemsList,
            customer : {
                email: user.user
            }
            
          });
    }

    render() {
        return (
            <>
            <div className="summarizeBtn" onClick={this.handleCheckout}>
            <p className="summarizeText">Start plan</p>
            </div>
            <div className="paymentSatsify">
            *No questions on refund if you're not satisfied
        </div>
        </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user
    }
}
export default connect(mapStateToProps)(Payment);
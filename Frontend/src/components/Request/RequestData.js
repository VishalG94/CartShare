import React, { Component, Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

class RequestData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data);
        return (
            <Fragment>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.initiater.screenName}</td>
                <td><button style={{ marginLeft: "2%" }} className="btn btn-success">Approve</button></td>
                <td><button style={{ marginLeft: "2%" }} className="btn btn-danger">Reject</button></td>
            </Fragment>
        )
    }
}

export default RequestData;
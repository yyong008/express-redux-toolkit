import { Component } from "react";

import { api } from "../apis"

export default class ClassComp extends Component {
    componentDidMount() {
        console.log("5", api)
    }
    render() {
        return <div>
            sadss
        </div>
    }
}
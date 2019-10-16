import React, { Component } from 'react';
import * as ionicon from "react-icons";

const Icon = (props) => {
    const Comp = ionicon[props.name];
    return Comp ? <Comp />: null;
}
export default Icon;
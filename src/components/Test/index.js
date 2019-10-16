import React from 'react';
import PropTypes from 'prop-types';
require('../i18n/i18n');

const { Component } = React;

const req = require.context("./", true, /^(.*\.(js$))[^.]*$/igm);
const versions = {};
req.keys().forEach((filePath) => {    
    if (filePath === './index.js') return;
   
    const matchFilenameBody = /^.*\/(.*)\/(.*)\.jsx?$[^.]*$/g;
    const match = matchFilenameBody.exec(filePath);
    const ver = match['1'];
    const filenameBody = match['2'];
    versions[ver] = req(filePath);
});

export default class Wrapper extends Component {
    render() {
        const { ver } = this.props;
        const latest = Object.keys(versions)[Object.keys(versions).length-1];
        let Comp = versions[(ver || latest)].default;
        if (!Comp) {
            Comp = versions[latest].default;
        }
        return <Comp {...this.props} />;
    }
}

Wrapper.propTypes = {
    ver: PropTypes.number,
};

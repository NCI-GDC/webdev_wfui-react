/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(263);


/***/ },

/***/ 263:
/***/ function(module, exports) {

	'use strict';

	WFUIJS.RCT = WFUIJS.RCT || {};
	WFUIJS.RCT.Icon_2 = React.createClass({
	    displayName: 'Icon_2',

	    render: function render() {
	        var data;
	        var iconClasses = '';

	        if (typeof this.props.data == 'string') {
	            data = JSON.parse(this.props.data);
	        } else {
	            data = this.props.data;
	        }

	        //mandatory class
	        iconClasses += 'wfui-icon fa fa-' + data.name;

	        if (data.size) {
	            iconClasses += ' fa-' + data.size;
	        }
	        if (data.is_fixed_width) {
	            iconClasses += ' fa-fw';
	        }
	        if (data.is_li_icon) {
	            iconClasses += ' fa-li';
	        }
	        if (data.has_border) {
	            iconClasses += ' fa-border';
	        }
	        if (data.pull) {
	            iconClasses += ' pull-' + data.pull;
	        }
	        if (data.is_spinning) {
	            iconClasses += ' fa-spin';
	        }
	        if (data.rotate) {
	            iconClasses += ' fa-rotate-' + data.rotate;
	        }
	        if (data.flip) {
	            iconClasses += ' fa-flip-' + data.flip;
	        }
	        if (data.stack) {
	            iconClasses += ' fa-stack-' + data.stack;
	        }

	        return React.createElement('i', { className: iconClasses });
	    }

	});

/***/ }

/******/ });
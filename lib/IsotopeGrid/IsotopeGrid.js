function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Isotope from 'isotope-layout';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import IsotopeItem from './IsotopeItem';
var columnProps = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.shape({
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
})]);
var ITEM_ROLE = IsotopeItem.defaultProps.role;

var IsotopeGrid =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IsotopeGrid, _React$Component);

  function IsotopeGrid(props) {
    var _this;

    _classCallCheck(this, IsotopeGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IsotopeGrid).call(this, props));
    _this.state = {
      isotope: null,
      reload: true
    };
    _this.createIsotope = _this.createIsotope.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IsotopeGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createIsotope();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var oldElems = [];

      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(function (item) {
          if (Array.isArray(item)) {
            item.forEach(function (i) {
              return oldElems.push(i);
            });
          } else {
            oldElems.push(item);
          }
        });
      } else {
        oldElems.push(this.props.children);
      }

      var newElems = [];

      if (Array.isArray(nextProps.children)) {
        nextProps.children.forEach(function (item) {
          if (Array.isArray(item)) {
            item.forEach(function (i) {
              return newElems.push(i);
            });
          } else {
            newElems.push(item);
          }
        });
      } else {
        newElems.push(nextProps.children);
      }

      var reload = oldElems.length !== newElems.length;
      var options = {};

      if (this.props.searchTerm.toLowerCase().trim() !== nextProps.searchTerm.toLowerCase().trim() || JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList) || JSON.stringify(this.props.category) !== JSON.stringify(nextProps.category)) {
        var reg = nextProps.wholeWord ? RegExp("\\b".concat(nextProps.searchTerm.toLowerCase().trim(), "\\b"), 'i') : RegExp("".concat(nextProps.searchTerm.toLowerCase().trim()), 'i');

        options.filter = function (itemElem) {
          var _this2 = this;

          var isoSearch = itemElem && itemElem.dataset ? itemElem.dataset.item : this.dataset ? this.dataset.item : null;
          return (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(function (filter) {
            return filter(itemElem || _this2, nextProps);
          })) && reg.test(isoSearch || '');
        };
      }

      if (this.props.sortBy !== nextProps.sortBy) {
        options.sortBy = nextProps.sortBy;
      }

      if (this.props.sortAscending !== nextProps.sortAscending) {
        options.sortAscending = nextProps.sortAscending;
      }

      if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
        options.getSortData = nextProps.getSortData;
      }

      if (reload !== this.state.reload) this.setState({
        reload: reload
      });

      if (nextProps.forceRearrange) {
        if (this.state.isotope) {
          this.state.isotope.arrange(_extends({}, options));
        } else if (Object.keys(options).length) {
          this.createIsotope();
        }
      }

      if (Object.keys(options).length && this.state.isotope) {
        this.state.isotope.arrange(_extends({}, options));
      } else if (Object.keys(options).length) {
        this.createIsotope();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.isotope) {
        if (this.state.reload) {
          this.state.isotope.reloadItems();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.isotope) {
        this.state.isotope.destroy();
      }
    }
  }, {
    key: "createIsotope",
    value: function createIsotope() {
      var _this$props = this.props,
          id = _this$props.id,
          wholeWord = _this$props.wholeWord,
          searchTerm = _this$props.searchTerm,
          filterList = _this$props.filterList,
          sortBy = _this$props.sortBy,
          sortAscending = _this$props.sortAscending,
          getSortData = _this$props.getSortData,
          onArrangeComplete = _this$props.onArrangeComplete;
      var isotope = this.state.isotope;
      var props = this.props;
      var reg = wholeWord ? RegExp("\\b".concat(searchTerm ? searchTerm.toLowerCase().trim() : '', "\\b"), 'i') : RegExp("".concat(searchTerm ? searchTerm.toLowerCase().trim() : ''), 'i');

      if (!isotope) {
        var _isotope = new Isotope(ReactDOM.findDOMNode(this), {
          itemSelector: ".".concat(id, "-item"),
          masonry: {
            columnWidth: '.wfui-isotope-grid-sizer',
            horizontalOrder: true
          },
          sortBy: sortBy,
          sortAscending: sortAscending,
          getSortData: getSortData,
          filter: function filter(itemElem) {
            var _this3 = this;

            var isoSearch = itemElem ? itemElem.dataset.item : this.dataset.item;
            return (!filterList || filterList.length === 0 || filterList.every(function (filter) {
              return filter(itemElem || _this3, props);
            })) && reg.test(isoSearch || '');
          }
        }); // Set event listener


        _isotope.on('arrangeComplete', onArrangeComplete);

        onArrangeComplete(_isotope.getFilteredItemElements());
        this.setState({
          isotope: _isotope
        });
      } else {
        this.state.isotope.reloadItems();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          width = _this$props2.width,
          xs = _this$props2.xs,
          sm = _this$props2.sm,
          md = _this$props2.md,
          lg = _this$props2.lg,
          children = _this$props2.children,
          className = _this$props2.className,
          stringifyField = _this$props2.stringifyField,
          disableItemStringify = _this$props2.disableItemStringify;
      var isotope = this.state.isotope;
      var elems = [];

      if (Array.isArray(children)) {
        children.forEach(function (item) {
          if (Array.isArray(item)) {
            item.forEach(function (i) {
              return elems.push(i);
            });
          } else {
            elems.push(item);
          }
        });
      } else {
        elems.push(children);
      }

      if (width) {
        return React.createElement("div", {
          id: id,
          className: classNames(className, "".concat(id, "-grid"), 'wfui-isotope-grid'),
          style: {
            width: '100%'
          }
        }, elems && elems.map(function (child, index) {
          if (!child) return null;

          switch (child.props.role) {
            case ITEM_ROLE:
              var newProps = Object.assign({
                index: index,
                id: id,
                width: width,
                xs: xs,
                sm: sm,
                md: md,
                lg: lg,
                isotope: isotope,
                stringifyField: stringifyField,
                disableItemStringify: disableItemStringify
              }, child.props);
              return cloneElement(child, _extends({}, newProps));

            default:
              return null;
          }
        }));
      }

      return React.createElement(Row, {
        id: id,
        className: classNames("".concat(id, "-grid"), 'wfui-isotope-grid', className)
      }, elems && elems.map(function (child, index) {
        if (!child || child.length === 0 || !child.props.role) return null;

        switch (child.props.role) {
          case ITEM_ROLE:
            var newProps = Object.assign({
              index: index,
              id: id,
              width: width,
              xs: xs,
              sm: sm,
              md: md,
              lg: lg,
              isotope: isotope,
              stringifyField: stringifyField,
              disableItemStringify: disableItemStringify
            }, child.props);
            return cloneElement(child, _extends({}, newProps));

          default:
            return null;
        }
      }));
    }
  }]);

  return IsotopeGrid;
}(React.Component);

IsotopeGrid.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  children: PropTypes.node,
  sortBy: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
  sortAscending: PropTypes.bool,
  getSortData: PropTypes.object,
  searchTerm: PropTypes.string,
  wholeWord: PropTypes.bool,
  filterList: PropTypes.arrayOf(PropTypes.func),
  onArrangeComplete: PropTypes.func,
  stringifyField: PropTypes.string,
  disableItemStringify: PropTypes.bool,
  forceRearrange: PropTypes.bool
};
IsotopeGrid.defaultProps = {
  searchTerm: '',
  xs: 12,
  sm: 6,
  md: 4,
  lg: 4,
  sortBy: 'original-order',
  sortAscending: true,
  onArrangeComplete: function onArrangeComplete(f) {
    return f;
  }
};
IsotopeGrid.Item = IsotopeItem;
export default connect(function (state) {
  return {
    category: state.visibilityFilter && state.visibilityFilter.category
  };
})(IsotopeGrid);
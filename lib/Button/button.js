'use strict';

WFUIJS.RCT = WFUIJS.RCT || {};
WFUIJS.RCT.Button_1 = React.createClass({
    displayName: 'Button_1',


    getInitialState: function getInitialState() {
        return {
            is_enabled: true,
            is_dropdown_open: false
        };
    },
    componentWillMount: function componentWillMount() {
        if (typeof this.props.data == 'string') {
            this.setState({
                data: JSON.parse(this.props.data)
            });
        } else {
            this.setState({
                data: this.props.data
            });
        }
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('click', this.onWindowClick);
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        if (typeof props.data == 'string') {
            this.setState({
                data: JSON.parse(props.data)
            });
        } else {
            this.setState({
                data: props.data
            });
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    },

    onWindowClick: function onWindowClick() {
        if (this.state.is_dropdown_open) {
            this.setState({ is_dropdown_open: false });
        }
    },
    //onClick for action button, not dropdown button
    onClick: function onClick(e) {
        e.preventDefault();
        var data = this.state.data;
        if (data.is_enabled) {
            if (typeof data.onClick == 'function') {
                data.onClick(e);
            }
            if (!data.is_split && data.dropdown && data.dropdown.uid) {
                this.dispatchDropdown(e);
            }
        }
    },
    //toggle dropdown state and execute dropdown action
    toggleDropdown: function toggleDropdown(e) {
        //set state for dropdown open/close
        this.setState({
            is_dropdown_open: !this.state.is_dropdown_open
        });

        e.preventDefault();
        if (typeof this.state.data.dropdownButtonClick == 'function') {
            this.state.data.dropdownButtonClick(e);
        }
        if (this.state.data.dropdown && this.state.data.dropdown.uid) {
            this.dispatchDropdown(e);
        }
    },

    //Notify dropdown menu to 
    dispatchDropdown: function dispatchDropdown(e) {
        var target = e.target;
        if (!WFUIJS.$(target).hasClass('wfui-button')) {
            target = WFUIJS.$(target).parents('.wfui-button');
        }
        WFUIJS.modules.AppDispatcher.handleViewAction({
            'actionType': 'toggleDropdownMenu',
            'data': { el: target, event: e, dropdown: this.state.data.dropdown }
        });
    },
    render: function render() {

        var data = this.state.data;
        if (typeof data.is_enabled == 'undefined') {
            this.state.data.is_enabled = this.state.is_enabled;
        }

        var dataForIcon = { 'name': data.icon_name }; //name for icon2 react class
        if (data.icon_name == 'spinner') {
            dataForIcon.is_spinning = true;
        }
        var singleSpace = "";
        if (data.icon_name && data.title) {
            //if there is a title and icon inside the button, there needs to be a space in between them
            singleSpace = ' ';
        };

        //buttonClasses
        var buttonClasses = this.state.data.className || '';
        if (!data.is_header_link || !data.dropdown) {
            buttonClasses += ' wfui-button';
        }
        if (data.is_primary) {
            buttonClasses += ' wfui-button-primary';
        }
        if (data.is_link) {
            buttonClasses += ' wfui-button-link';
        }
        if (data.is_subtle) {
            buttonClasses += ' wfui-button-subtle';
        }
        if (data.is_split) {
            buttonClasses += ' wfui-button-split-main';
        }

        //dropdown button classes
        var dropdownButtonClasses = this.state.data.className + ' wfui-button';
        if (data.is_split) {
            dropdownButtonClasses += ' wfui-btn-group-dropdownButton';
        }

        //dropdown group: action button classes
        var actionButtonClasses = this.state.data.className + ' wfui-button';
        if (data.is_split) {
            actionButtonClasses += ' wfui-btn-group-actionButton';
        }
        if (data.is_primary) {
            actionButtonClasses += ' wfui-button-primary';
        }

        /*check if dropdown button needs class for an up arrow or down arrow*/
        dropdownButtonClasses += ' wfui-dropdown3-trigger';
        if (this.state.is_dropdown_open) {
            dropdownButtonClasses += '-active';
        }

        /*render conditions*/
        if (data.is_split && data.is_header_link) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { onClick: this.onClick, 'aria-disabled': !data.is_enabled, className: 'wfui-button-split-main' },
                    React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                    singleSpace,
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
                ),
                React.createElement(
                    'button',
                    { className: dropdownButtonClasses },
                    'Split button more'
                )
            );
        } else if (data.is_split) {
            return React.createElement(
                'div',
                { className: 'wfui-btn-group-container' },
                React.createElement(
                    'button',
                    { onClick: this.onClick, className: actionButtonClasses, 'aria-disabled': !data.is_enabled },
                    React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                    singleSpace,
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
                ),
                React.createElement('button', { onClick: this.toggleDropdown, className: dropdownButtonClasses })
            );
        } else if (data.is_single_dropdown_button) {
            return React.createElement(
                'div',
                { className: 'wfui-btn-group-container' },
                React.createElement(
                    'button',
                    { onClick: this.toggleDropdown, className: dropdownButtonClasses },
                    React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                    singleSpace,
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
                )
            );
        } else if (data.is_header_link) {
            if (data.href) {
                return React.createElement(
                    'a',
                    { href: data.href || "#", 'aria-disabled': !data.is_enabled },
                    React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                    singleSpace,
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
                );
            } else {
                return React.createElement(
                    'a',
                    { href: data.href || "#", onClick: this.onClick, 'aria-disabled': !data.is_enabled },
                    React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                    singleSpace,
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
                );
            }
        } else {
            return React.createElement(
                'button',
                { onClick: this.onClick, className: buttonClasses, 'aria-disabled': !data.is_enabled },
                React.createElement(WFUIJS.RCT.Icon_2, { data: dataForIcon }),
                singleSpace,
                React.createElement('span', { dangerouslySetInnerHTML: { __html: data.title } })
            );
        }
    }
});
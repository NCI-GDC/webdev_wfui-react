import React from 'react';
import { ButtonToolbar, Button, DropdownButton, Glyphicon, MenuItem, Panel } from 'react-bootstrap';
import classNames from 'classnames';

class DashboardBox extends React.Component {
    renderConfigs() {
        const { configs } = this.props;

        return (
            <DropdownButton
                bsStyle="default"
                title={<Glyphicon glyph="cog" />}
                id="wfui-dashboardBox-config"
                noCaret
            >
                {configs.map((item, idx) =>
                    <MenuItem
                        key={idx}
                        href={item.href}
                        onClick={item.onClick}
                    >
                        {item.name}
                    </MenuItem>)}
            </DropdownButton>
        );
    }

    renderHeader() {
        const { imageURL, title, buttons, configs } = this.props;

        return (
            <div className="widget__header">
                <div className="widget__header__title">
                    { imageURL && <img src={imageURL} alt={`${title} Logo`} />}
                    <h2 className="widget__header__title">{ title }</h2>
                </div>
                <ButtonToolbar className="widget__header__buttons">
                    {
                    buttons &&
                    buttons.map((item, idx) =>
                        <Button
                            key={idx}
                            bsStyle={item.bsStyle || 'primary'}
                            href={item.href}
                            onClick={item.onClick}
                        >{item.name}</Button>)
                    }
                    { configs && this.renderConfigs() }
                </ButtonToolbar>
            </div>
        );
    }

    render() {
        const { className, children } = this.props;

        return (
            <Panel className={classNames(className, 'wfui-dashboardBox')} header={this.renderHeader()}>
                <div className="widget__body">{ children }</div>
            </ Panel>
        );
    }
}

DashboardBox.propTypes = {
    title: React.PropTypes.string,
    imageURL: React.PropTypes.string,
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        href: React.PropTypes.string,
        name: React.PropTypes.string,
        onClick: React.PropTypes.func,
        bsStyle: React.PropTypes.string,
    })),
    configs: React.PropTypes.arrayOf(React.PropTypes.shape({
        href: React.PropTypes.string,
        name: React.PropTypes.string,
        onClick: React.PropTypes.func,
    })),
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
};

DashboardBox.defaultTypes = {
    title: '',
    imageURL: '',
    buttons: [],
    configs: [],
    children: [],
};


export default DashboardBox;

import React from 'react';
import { ButtonToolbar, Button, DropdownButton, Glyphicon, MenuItem, Panel } from 'react-bootstrap';
import classNames from 'classnames';

class DashboardBox extends React.Component {
    renderConfigs() {
        const { configs } = this.props;

        return (
            <DropdownButton
                bsStyle="link"
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
            <header className="widget__header">
                <span>{ imageURL && <img src={imageURL} width="32" height="32" alt={`${title} Logo`} />}</span>
                <h2 className="widget__header__title">Institutional Repository</h2>
                <div className="widget__header__buttons">
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
                </div>
                { configs && this.renderConfigs() }
            </header>
        );
    }

    render() {
        const { className, children } = this.props;

        return (
            <div className={classNames(className, 'widget wfui-dashboardBox')}>
                {this.renderHeader()}
                <div className="widget__body" style={{ overflowX: 'auto'}}>{ children }</div>
            </div>
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

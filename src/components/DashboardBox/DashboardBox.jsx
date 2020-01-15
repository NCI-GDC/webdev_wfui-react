import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, DropdownButton, Panel } from 'react-bootstrap';
import classNames from 'classnames';
import { MenuItem, Glyphicon } from '..';

class DashboardBox extends React.Component {
    renderConfigs() {
        const { configs } = this.props;

        return (
            <DropdownButton
                variant="link"
                title={<Glyphicon glyph="cog" />}
                id="wfui-dashboardBox-config"
                noCaret
                pullRight
            >
                {configs.map((item, idx) => (
                    <MenuItem key={idx} href={item.href} onClick={item.onClick}>
                        {item.name}
                    </MenuItem>
                ))}
            </DropdownButton>
        );
    }

    renderHeader() {
        const { imageURL, title, buttons, configs } = this.props;

        return (
            <header className="widget__header">
                <h2 className="widget__header__title">
                    <div className="widget__header__title__img_container">
                        {imageURL && (
                            <img
                                src={imageURL}
                                width="32"
                                height="32"
                                alt={`${title} Logo`}
                            />
                        )}
                    </div>
                    <div className="widget__header__title__text">{title}</div>
                </h2>
                <div className="widget__header__buttons">
                    {buttons &&
                        buttons.map((item, idx) => (
                            <Button
                                key={idx}
                                variant={item.variant || 'primary'}
                                href={item.href}
                                onClick={item.onClick}
                            >
                                {item.name}
                            </Button>
                        ))}

                    {configs && this.renderConfigs()}
                </div>
            </header>
        );
    }

    render() {
        const { className, children } = this.props;

        return (
            <div className={classNames(className, 'widget wfui-dashboardBox')}>
                {this.renderHeader()}
                <div className="widget__body" style={{ overflowX: 'auto' }}>
                    {children}
                </div>
            </div>
        );
    }
}

DashboardBox.propTypes = {
    title: PropTypes.string,
    imageURL: PropTypes.string,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            name: PropTypes.string,
            onClick: PropTypes.func,
            variant: PropTypes.string,
        })
    ),
    configs: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            name: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
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

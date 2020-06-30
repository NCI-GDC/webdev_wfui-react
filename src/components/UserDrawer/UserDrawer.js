import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from '../index';
import DrawerButton from '../Drawer/DrawerButton';
import Spinner from '../Spinner/Spinner';
import Icon from '../Icon/Icon';

const defaultSpinner = (
    <div className="groups-drawer" style={{ width: '100px', height: '50px' }}>
        <Spinner type={1} fontSize="10" margin="40px" />
    </div>
);

class UserDrawer extends Component {
    renderSpinner() {
        return this.props.spinnerFormat;
    }

    renderUserMenu() {
        const { userMenu, listClassName } = this.props;
        const menuItems = userMenu.map((menu, idx) => (
            <li key={idx}>
                <a href={menu.link}>
                    {menu.icon ? <Icon name={menu.icon} /> : null}
                    {menu.title}
                </a>
            </li>
        ));

        return (
            <div className="clearfix row">
                <div className="col-md-12">
                    <ul
                        className={`links-list--no-wrap list-unstyled ${listClassName}`}
                    >
                        {menuItems}
                    </ul>
                </div>
            </div>
        );
    }

    renderUserInfo() {
        const { userInfo } = this.props;
        return (
            <div className="popover-title">
                {userInfo.image ? (
                    <img width={40} height={40} src={userInfo.image} />
                ) : (
                    ''
                )}
                <span className="is-lower-case is-aligned-left">
                    <h3>{userInfo.email}</h3>
                </span>
            </div>
        );
    }

    render() {
        const { userInfo, userMenu, ...props } = this.props;

        if (!userInfo.uid) {
            return (
                <Button disabled {...props}>
                    <Spinner type={1} fontSize="5" margin="20px" />
                </Button>
            );
        }

        return (
            <DrawerButton {...props} title={userInfo.email}>
                <div className="users-drawer">{this.renderUserInfo()}</div>
                <div className="popover-body">
                    {userMenu.length > 0
                        ? this.renderUserMenu()
                        : this.renderSpinner()}
                </div>
            </DrawerButton>
        );
    }
}

UserDrawer.propTypes = {
    userMenu: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            title: PropTypes.string,
            link: PropTypes.string,
        })
    ),
    userInfo: PropTypes.shape({
        uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        email: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
    }),
    useCaret: PropTypes.bool,
    spinnerFormat: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    listClassName: PropTypes.string,
};

UserDrawer.defaultProps = {
    userMenu: [],
    userInfo: {
        uid: 0,
        email: '',
        name: '',
        image: '',
    },
    spinnerFormat: defaultSpinner,
    useCaret: true,
    variant: 'link',
    listClassName: '',
};

export default UserDrawer;

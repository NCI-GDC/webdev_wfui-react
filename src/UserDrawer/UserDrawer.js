import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import DrawerButton from '../Drawer/DrawerButton';
import Spinner from '../Spinner/Spinner';

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
        const { userMenu } = this.props;
        const menuItems = userMenu.map(menu =>
             (
                <li>
                    <a href={menu.link}>
                        { menu.icon ? <Glyphicon glyph={menu.icon} /> : null}
                        { menu.title }
                    </a>
                </li>
            ),
        );

        return (
            <li className="list-unstyled">
                {menuItems}
            </li>
        );
    }

    renderUserInfo() {
        const { userInfo } = this.props;
        return (
            <div className="user-drawer-info">
                <div className="col-xs-3" style={{ minWidth: '40px', minHeight: '40px', padding: '0' }}>
                    <img width={40} height={40} src={userInfo.image} />
                </div>
                <div className="col-xs-9">
                    <p style={{ lineHeight: '40px' }}>{userInfo.email}</p>
                </div>
            </div>
        );
    }

    render() {
        const {
            userInfo,
            userMenu,
            ...props
        } = this.props;

        if (!userInfo.uid) {
            return (
                <Button disabled {...props}>
                    <Spinner type={1} fontSize="5" margin="20px" />
                </Button>
            );
        }

        return (
            <DrawerButton {...props} title={userInfo.email}>
                <div className="users-drawer">
                    { this.renderUserInfo() }
                </div>
                <div className="users-drawer">
                    { userMenu.length > 0 ?
                        this.renderUserMenu() : this.renderSpinner() }
                </div>
            </DrawerButton>
        );
    }
}

UserDrawer.propTypes = {
    userMenu: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string,
    })),
    userInfo: PropTypes.shape({
        uid: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
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
};

export default UserDrawer;

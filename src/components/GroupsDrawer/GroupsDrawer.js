import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import DrawerButton from '../Drawer/DrawerButton';
import DefaultGroupsItem from './DefaultGroupsItem';
import DefaultFooterItem from './DefaultFooterItem';
import Spinner from '../Spinner/Spinner';

const defaultSpinner = (
    <div className="groups-drawer" style={{ width: '100px', height: '50px' }}>
        <Spinner type={1} fontSize="10" margin="40px" />
    </div>
);

class GroupsDrawer extends Component {
    renderGroups() {
        const { data: { groups }, groupsItemFormat, groupsContainer } = this.props;
        const groupsComponent = groups.map((group, idx) =>
            cloneElement(groupsItemFormat, {
                key: idx,
                ...group,
            }),
        );
        return cloneElement(groupsContainer, { className: 'groups-drawer-body row', children: groupsComponent });
    }

    renderFooter() {
        const { data: { footer }, footerItemFormat, footerContainer } = this.props;
        const footerComponent = footer.map((item, idx) =>
            cloneElement(footerItemFormat, {
                key: idx,
                ...item,
            }),
        );

        return (
            <ul className="groups-drawer-footer links-list--primary">
                {cloneElement(footerContainer, { children: footerComponent })}
            </ul>
        );
    }

    renderPopover() {
        const { data: { groups, footer } } = this.props;
        return (
            <div className="groups-drawer">
                {(groups && groups.length > 0) ? this.renderGroups() : null}
                {(footer && footer.length > 0) ? this.renderFooter() : null}
            </div>

        );
    }

    renderSpinner() {
        return this.props.spinnerFormat;
    }

    render() {
        const {
            data,
            ...props
        } = this.props;
        return (
            <DrawerButton {...props}>
                {(data && Object.keys(data).length > 0) ?
                    this.renderPopover() : this.renderSpinner()}
            </DrawerButton>
        );
    }
}

GroupsDrawer.propTypes = {
    popoverTitle: PropTypes.string,
    data: PropTypes.shape({
        groups: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })),
        footer: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })),
    }),
    spinnerFormat: PropTypes.element,
    groupsItemFormat: PropTypes.element,
    footerItemFormat: PropTypes.element,
    groupsContainer: PropTypes.element,
    footerContainer: PropTypes.element,
    ...DrawerButton.propTypes,
};

GroupsDrawer.defaultProps = {
    variant: 'link',
    title: '',
    isIcon: true,
    icon: 'th',
    image: null,
    useCaret: false,
    placement: 'bottom',
    popoverTitle: 'MY GROUPS',
    groupsContainer: <div />,
    footerContainer: <li className="list-inline" />,
    spinnerFormat: defaultSpinner,
    groupsItemFormat: <DefaultGroupsItem />,
    footerItemFormat: <DefaultFooterItem />,
};

export default GroupsDrawer;

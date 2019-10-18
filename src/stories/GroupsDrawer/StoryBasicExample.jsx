import React from 'react';
import GroupsDrawer from '../../components/GroupsDrawer/GroupsDrawer';
import imageFile from './icon.svg';

const data = {
    groups: [
        {
            icon: imageFile,
            title: 'JIRA',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'WIKI',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'Events',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'Labs',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'Projects',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'IR',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'GA',
            link: '#',
        },
        {
            icon: imageFile,
            title: 'ICGC',
            link: '#',
        },
    ],
    footer: [
        {
            title: 'Manage Groups',
            link: '#',
        },
        {
            title: 'Customize Dashboard',
            link: '#',
        },
    ],
};

const example = <GroupsDrawer data={data} />;
export default example;

import React from 'react';
import UserDrawer from '../../components/UserDrawer/UserDrawer';

const userInfo = {
    uid: 1,
    email: 'tester@test.com',
    name: 'Tester Testing',
    image: 'https://dummyimage.com/100x100/000/fff',
};

const userMenu = [
    {
        title: 'User Profile',
        link: '#',
        icon: 'user',
    },
    {
        title: 'Account Settings',
        link: '#',
        icon: 'cog',
    },
    {
        title: 'Log Out',
        link: '#',
        icon: 'log-out',
    },
];

const example = <UserDrawer userInfo={userInfo} userMenu={userMenu} />;

export default example;

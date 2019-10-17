import React from 'react';
import DashboardBox from '../../components/DashboardBox/DashboardBox';
import imageFile from './icon.svg';
// import '../../components/DashboardBox/index.scss';


const temp = [
    {
        title: 'JIRA',
        imageURL: imageFile,
        buttons: [
            {
                name: 'Create Issue',
                onClick: () => alert('click'),
                variant: 'primary',
            }
        ],
        configs: [
            {
                href: '#',
                name: 'Link 1',
            }, {
                href: '#',
                name: 'Link 2',
            }
        ]
    },
    {
        title: 'WIKI',
        buttons: [
            {
                name: 'Button 1',
                onClick: () => alert('Button 1'),
                variant: 'primary',
            }, {
                name: 'Button 2',
                onClick: () => alert('Button 2'),
                variant: 'primary',
            }
        ],
        configs: [
            {
                href: '#',
                name: 'Link 1',
            }, {
                href: '#',
                name: 'Link 2',
            }
        ]
    }
]
class Example extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div className="container">
                {data.map((box, idx) => {
                    return (
                        <DashboardBox {...box} key={idx}>
                            <p>Hello</p>
                        </DashboardBox>
                    );
                })}
            </div>
        )
    }
}

export default <Example data={temp} />;
import React from 'react';
import { Glyphicon, DraggableWithContext as Draggable } from '../../components/';
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
            <Draggable type="grid">
                {data.map((box, idx) => {
                    return (
                        <Draggable.Item key={idx}>
                            <Draggable.Handle><Glyphicon glyph="move" /></Draggable.Handle>
                            <DashboardBox {...box}>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</div>
                            </DashboardBox>
                        </Draggable.Item>
                    );
                })}
            </Draggable>
        )
    }
}

export default <Example data={temp} />;
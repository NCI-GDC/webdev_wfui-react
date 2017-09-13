import React from 'react';
// import BaseWebformField from './BaseWebformField'
import Field from './Field'

/**
 * Fields: Render array of field
 */
export default class Fields extends React.Component {
    render() {
        const that = this;
        const { section, className, translated, groupId, groupIndex } = this.props;
        if (section.children) {

            return (
                <div className={className}>
                    {section.children.map((field, i) => {
                        const _field = JSON.parse(JSON.stringify(field));
                        _field.sectionId = section.sectionId || section.id;
                        _field.parent = section.id;
                        _field.groupId = groupId;
                        _field.groupIndex = groupIndex;
                        return (
                            <div className="fields" key={i}><Field field={_field} translated={translated} /></div>
                        );
                    })}
                </div>
            );
        }
        console.error('The prop field data does not have \'#field\'', 'Fields');
        return null;
    }
}

import React from 'react';
import Fields from './Fields';
import Description from '../../FormFields/Description';

/**
 * Wrapper for regular Fieldset Group
 */
export default class TypeFieldset extends React.Component {

    render() {
        const { question, lang } = this.props;
        const data = question.values[lang] || {};
        const groupId = question.groupId;
        
        return (
            <div className={'wfui-type-fieldset'} >
                <label>{data.title}</label>
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <Fields groupId={`${groupId ? `${groupId}.` : ''}${question.id}`} section={question} />
            </div>
        );
    }
}

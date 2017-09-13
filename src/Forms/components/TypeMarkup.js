import React from 'react';
import Description from '../../FormFields/Description';

/**
 * Wrapper for Question Type 2 (InputField)
 */
export default class TypeMarkup extends React.Component {
    render() {
        const { question, lang } = this.props;
        const data = question.values[lang] || {};
        return (
            <div>
                <div className="question-type-text">
                    <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />
                </div>
            </div>
        );
    }
}

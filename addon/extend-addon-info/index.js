import html from 'html';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import infoAddon from '@kadira/react-storybook-addon-info';
import style from './style';

export default {
    addWithInfo(storyName, info, storyFn, _options) {
        if (typeof storyFn !== 'function') {
            if (typeof info === 'function') {
                _options = storyFn;
                storyFn = info;
                info = '';
            } else {
                throw new Error('No story defining function has been specified');
            }
        }
        if (_options && _options.static) {
            this.addDecorator((getStory) => {
                return (
                    <div>
                        {getStory()}
                        <div style={style.baseFonts}>
                            <h1 style={style.h1}>
                                Static Markup
                            </h1>
                            <pre style={style.pre}>
                                { html.prettyPrint(ReactDOMServer.renderToStaticMarkup(storyFn())) }
                            </pre>
                        </div>
                    </div>
                );
            });
        }
        infoAddon.addWithInfo.apply(this, [storyName, info, storyFn, _options]);
    },
};

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import infoAddon from '@kadira/react-storybook-addon-info';
import style from './style';

export default {
    addWithInfo(storyName, info, storyFn, _options){
        this.addDecorator(function(getStory, a) {
            return (
                <div>
                    {getStory()}
                    <div style={style.baseFonts}>
                        <h1 style={style.h1}>Static Markup</h1>
                        <pre style={style.pre}>{ReactDOMServer.renderToStaticMarkup(info())}</pre>
                    </div>
                </div>
            )
        })
        infoAddon.addWithInfo.apply(this, [storyName, info, storyFn, _options]);
    }
};
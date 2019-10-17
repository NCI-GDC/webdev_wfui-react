import React, { Component } from 'react';
import * as ionicon from "react-icons/io";

const glyphIconMap = {
    cog: 'IoMdSettings',
    asterisk: 'asterisk',
    envelope: 'IoMdMail',
    pencil: 'IoMdCreate',
    remove: 'IoIosClose',
    comment: 'IoMdText',
    plus: 'IoIosAdd',
    user: 'IoMdPerson',
    tag: 'IoMdPricetag',
    'align-left': 'IoMdList',
    'remove-circle': 'IoIosCloseCircleOutline',
    'eye-close': 'IoIosEye',
    move: 'IoIosMove'
}

const Icon = (props) => {
    const Comp = ionicon[props.name || glyphIconMap[props.glyph] || ''];
    return Comp ? <Comp /> : null;
}
export default Icon;
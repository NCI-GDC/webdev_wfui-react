import React from 'react';
import PasswordValidator from '../../components/PasswordValidator/PasswordValidator';

const example = (
    <PasswordValidator password="" password_confirm="" onValidateStatusChange={(status)=>{ console.log(status) }} validateWith={['length', 'uppercase', 'lowercase', 'number']}/>
);
export default example;
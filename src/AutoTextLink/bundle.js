import React from 'react';
import ReactDOM from 'react-dom';
import AutoTextLink from '../../src/AutoTextLink/auto_text_link';

ReactDOM.render(
  <AutoTextLink>{'This module repository: https://github.com/hokuma/auto-text-link'}</AutoTextLink>,
  document.getElementById('sample1')
);
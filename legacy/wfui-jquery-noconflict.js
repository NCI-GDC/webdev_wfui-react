// Allow WFUI to use a newer version of jQuery alongside the older version used
// by Drupal

// For this to work, the script loading order must be as follows, with nothing
// loaded in between the scripts, otherwise there could be jQuery problems:
// 1. jquery-1.8.3.js
// 2. wfui.js
// 3. wfui-jquery-noconflict.js
// 
$.noConflict(true);
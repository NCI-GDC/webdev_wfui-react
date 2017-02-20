import * as bootstrap from 'react-bootstrap';
import * as cagforms from './CaGForms/';
import NotificationSystem from 'react-notification-system';
import Dropzone from 'react-dropzone';
import TimezonePicker from 'react-timezone';
import FilteredList from './FilteredList/FilteredList';
import Spinner from './Spinner/Spinner';
import TwitterFeed from './TwitterFeed/TwitterFeed';
import FilteredTable from './FilteredTable/FilteredTable';
import PasswordValidator from './PasswordValidator/PasswordValidator';
import Draggable from './Draggable/Draggable';
import DashboardBox from './DashboardBox/DashboardBox';
import UserDrawer from './UserDrawer/UserDrawer';
import Drawer from './Drawer/Drawer';

require('./i18n/i18n.js');

module.exports = {
    FilteredList,
    Spinner,
    TwitterFeed,
    FilteredTable,
    PasswordValidator,
    Draggable,
    DashboardBox,
    UserDrawer,
    Drawer,
    // Third Party Components
    NotificationSystem,
    Dropzone,
    TimezonePicker,
    // React Bootstrap
    ...bootstrap,
    // CaG Forms
    ...cagforms,
};

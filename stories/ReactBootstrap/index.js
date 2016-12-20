import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

import StoryAvator from 'raw!./StoryAvator.src';
import StoryBadgesCode from 'raw!./StoryBadges.src';
import StoryButton from 'raw!./StoryButton.src';
import StoryDialog from 'raw!./StoryDialog.src';
import StoryDropdown from 'raw!./StoryDropdown.src';
import StoryExpander from 'raw!./StoryExpander.src';
import StoryForms from 'raw!./StoryForms.src';
import StoryHeader from 'raw!./StoryHeader.src';
import StoryLabels from 'raw!./StoryLabels.src';
import StoryIcons from 'raw!./StoryIcons.src';
import StoryPopover from 'raw!./StoryPopover.src';
import StoryMessage from 'raw!./StoryMessage.src';
import StoryPane from 'raw!./StoryPane.src';
import StoryProgress from 'raw!./StoryProgress.src';
import StoryTable from 'raw!./StoryTable.src'; 
import StoryTabs from 'raw!./StoryTabs.src';
import StoryTooltip from 'raw!./StoryTooltip.src';
import StoryPagination from 'raw!./StoryPagination.src';

storiesOf('ReactBootstrap', module)
.addWithInfo(
    'Avator',
    () => StoryAvator,
    { scope: { Grid, Col, Image, Row } },
)
.addWithInfo(
    'Badges',
    () => StoryBadgesCode,
    { scope: { Badge } },
)
.addWithInfo(
    'Buttons',
    () => StoryButton,
    { scope: { ButtonToolbar, Button, ButtonGroup } },
)
.addWithInfo(
    'Dialog (Modal)',
    () => StoryDialog,
    { scope: { Button, Popover, Tooltip, Modal, OverlayTrigger } },
)
.addWithInfo(
    'Dropdown',
    () => StoryDropdown,
    { scope: { ButtonToolbar, DropdownButton, SplitButton, MenuItem } },
)
.addWithInfo(
    'Expander (Collapse)',
    () => StoryExpander,
    { scope: { Collapse, Button, Well }}
)
.addWithInfo(
    'Forms',
    () => StoryForms,
    { scope: { FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio, Button } },
)
.addWithInfo(
    'Header (Nav)',
    () => StoryHeader,
    { scope: { Nav, Navbar, NavItem, NavDropdown, MenuItem } },
)   
.addWithInfo(
    'Icons',
    () => StoryIcons,
    { scope: { Glyphicon } },
)
.addWithInfo(
    'Inline Dialog(Popover)',
    () => StoryPopover,
    { scope: { Popover, OverlayTrigger, Button } }
)
.addWithInfo(
    'Labels',
    () => StoryLabels,
    { scope: { Label } }
)
.addWithInfo(
    'Message (Alert)',
    () => StoryMessage,
    { scope: { Alert } },
)
.addWithInfo(
    'Pane (Grid)',
    () => StoryPane,
    { scope: { Grid, Row, Col } },
)
.addWithInfo(
    'Progress Indicator',
    () => StoryProgress,
    { scope: { ProgressBar } }
)
.addWithInfo(
    'Table',
    () => StoryTable,
    { scope: { Table } },
)
.addWithInfo(
    'Tabs',
    () => StoryTabs,
    { scope: { Tab, Row, Col, Nav, NavItem, NavDropdown, MenuItem } },
)
.addWithInfo(
    'Tooltip',
    () => StoryTooltip,
    { scope: { Tooltip, OverlayTrigger, Button, ButtonToolbar } },
)
.addWithInfo(
    'Pagination',
    () => StoryPagination,
    { scope: { Pagination, Pager } },
);

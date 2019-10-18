import { storiesOf } from '@storybook/react';

import StoryAvator from './StoryAvator';
import StoryBadgesCode from './StoryBadges';
import StoryButton from './StoryButton';
import StoryDialog from './StoryDialog';
import StoryDropdown from './StoryDropdown';
import StoryExpander from './StoryExpander';
import StoryForms from './StoryForms';
import StoryHeader from './StoryHeader';
import StoryLabels from './StoryLabels';
import StoryPopover from './StoryPopover';
import StoryMessage from './StoryMessage';
import StoryPane from './StoryPane';
import StoryProgress from './StoryProgress';
import StoryTable from './StoryTable';
import StoryTabs from './StoryTabs';
import StoryTooltip from './StoryTooltip';
import StoryPagination from './StoryPagination';

storiesOf('ReactBootstrap', module)
    .add('Avator', () => StoryAvator)
    .add('Badges', () => StoryBadgesCode)
    .add('Buttons', () => StoryButton)
    .add('Dialog (Modal)', () => StoryDialog)
    .add('Dropdown', () => StoryDropdown)
    .add('Expander (Collapse)', () => StoryExpander)
    .add('Forms', () => StoryForms)
    .add('Header (Nav)', () => StoryHeader)
    // .add(
    //     'Icons',
    //     () => StoryIcons
    // )
    .add('Inline Dialog(Popover)', () => StoryPopover)
    .add('Badges', () => StoryLabels)
    .add('Message (Alert)', () => StoryMessage)
    .add('Pane (Container)', () => StoryPane)
    .add('Progress Indicator', () => StoryProgress)
    .add('Table', () => StoryTable)
    .add('Tabs', () => StoryTabs)
    .add('Tooltip', () => StoryTooltip)
    .add('Pagination', () => StoryPagination);

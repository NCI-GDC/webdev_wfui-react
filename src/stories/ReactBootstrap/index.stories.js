import { storiesOf } from '@storybook/react';

import StoryAlerts from './StoryAlerts';
import StoryAccordion from './StoryAccordion';
import StoryBadges from './StoryBadges';
import StoryBreadcrumbs from './StoryBreadcrumbs';
import StoryButton from './StoryButton';
import StoryButtonGroup from './StoryButtonGroup';
import StoryCard from './StoryCard';
import StoryCarousel from './StoryCarousel';
import StoryDropdown from './StoryDropdown';

import StoryDialog from './StoryDialog';
import StoryExpander from './StoryExpander';
import StoryForms from './StoryForms';
import StoryHeader from './StoryHeader';
import StoryImage from './StoryImage';
import StoryPopover from './StoryPopover';
import StoryMessage from './StoryMessage';
import StoryPane from './StoryPane';
import StoryProgress from './StoryProgress';
import StoryTable from './StoryTable';
import StoryTabs from './StoryTabs';
import StoryTooltip from './StoryTooltip';
import StoryPagination from './StoryPagination';

storiesOf('ReactBootstrap', module)
    .add('Alerts', () => StoryAlerts)
    .add('Accordion', () => StoryAccordion)
    .add('Badges', () => StoryBadges)
    .add('Breadcrumb', () => StoryBreadcrumbs)
    .add('Buttons', () => StoryButton)
    .add('Button Group', () => StoryButtonGroup)
    .add('Cards', () => StoryCard)
    .add('Carousel', () => StoryCarousel)
    .add('Dropdown', () => StoryDropdown)

    .add('Dialog (Modal)', () => StoryDialog)
    .add('Expander (Collapse)', () => StoryExpander)
    .add('Forms', () => StoryForms)
    .add('Header (Nav)', () => StoryHeader)
    .add('Image', () => StoryImage)
    // .add(
    //     'Icons',
    //     () => StoryIcons
    // )
    .add('Inline Dialog(Popover)', () => StoryPopover)
    // .add('Badges', () => StoryLabels)
    .add('Message (Alert)', () => StoryMessage)
    .add('Pane (Container)', () => StoryPane)
    .add('Progress Indicator', () => StoryProgress)
    .add('Table', () => StoryTable)
    .add('Tabs', () => StoryTabs)
    .add('Tooltip', () => StoryTooltip)
    .add('Pagination', () => StoryPagination);

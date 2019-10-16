import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import StoryAnimateExample from './StoryAnimateExample';
// import '../../components/DashboardCard/index.scss';


storiesOf('IsotopeGrid', module)
    .add('Basic Example', () => StoryBasicExample)
    .add('With Animated Height', () => StoryAnimateExample);
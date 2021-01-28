Filtered table is one of the most frequently used wfui component. Filtered table displays a set/collection of data in a table and allows users to filter/search/sort/select+bulk action on the data set. Currently, there are two versions of filtered tables available. It is advised to use version 2 as version 1 has performance issues. Filtered table version 2 uses fixed-data-table-2. For more information, please visit their github repo https://github.com/schrodinger/fixed-data-table-2

*Note*: Version 1 has performance issues with large data and is not actively maintained at the moment. It’s only used in UMS at the moment and all filtered tables in UMS need to be updated to version 2.

Here is steps to follow:
1. Define Filters and create filter UI
You can either use *Filters*, *FilterItem* and *FilterFields* component defined in wfui or create your own custom filters. Filters have props *textReset* and *onClickReset* that could be used optionally to define a filter reset button.
```
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Filters, FilterItem, FilterFields, FormGroup, FormControl, ControlLabel } from 'wfui-react';

const { renderSelectFilter, renderDateFilter, renderTextFilter } = FilterFields;

class Filter extends React.Component {
   render() {
       const {
           resetFilter,
           applyBulkAction,
           showing,
           intl,
           location,
           selected
       } = this.props;

       return (
           <div className="table-meta">
               <div className="filters-container">
                   <div className="filters-top-container form-inline">
                       {// Filters with reset functionality}
                           <Filters
                               className="content-management-filters"
                               textReset={intl.formatMessage({
                                   id: 'content_manager.filterLabels.clear'
                               })}
                               onClickReset={resetFilter}
                           >
                               {// Example dropdown select filter}
                                   <FilterItem
                                       name="status"
                                       label={intl.formatMessage({
                                           id: 'content_manager.filterLabels.status'
                                       })}
                                       location={location}
                                       component={renderSelectFilter}
                                       items={[
                                           {
                                               label: intl.formatMessage({
                                                   id:
                                                       'content_manager.filterLabels.statusOptions.all'
                                               }),
                                               value: ''
                                           },
                                           {
                                               label: intl.formatMessage({
                                                   id:
                                                       'content_manager.status.published'
                                               }),
                                               value: 'published'
                                           },
                                           {
                                               label: intl.formatMessage({
                                                   id:
                                                       'content_manager.status.unpublished'
                                               }),
                                               value: 'unpublished'
                                           },
                                           {
                                               label: intl.formatMessage({
                                                   id: 'content_manager.status.draft'
                                               }),
                                               value: 'draft'
                                           }
                                       ]}
                                   />
                           {// Example date filter with datepicker}
                               <FilterItem
                                   name="dateStart"
                                   label={intl.formatMessage({
                                       id:
                                           'content_manager.filterLabels.update_between'
                                   })}
                                   location={location}
                                   component={renderDateFilter}
                               />
                               <FilterItem
                                   name="dateEnd"
                                   label={intl.formatMessage({
                                       id: 'content_manager.filterLabels.and'
                                   })}
                                   location={location}
                                   component={renderDateFilter}
                               />
                               {// Example text filter}
                                   <FilterItem
                                       name="searchTerm"
                                       label={intl.formatMessage({
                                           id: 'content_manager.filterLabels.search',
                                           defaultMessage: 'Search:'
                                       })}
                                       placeholder={intl.formatMessage({
                                           id:
                                               'content_manager.filterLabels.search_placeholder',
                                           defaultMessage: 'Enter Keywords'
                                       })}
                                       location={location}
                                       component={renderTextFilter}
                                   />
                       </Filters>
                   </div>
               </div>
           </div>
                   );
               }
           }
Filter.propTypes = {
                       resetFilter: PropTypes.func
               };
Filter.defaultProps = {
                       resetFilter: f => f,
                   applyBulkAction: f => f
               };
              
               export default Filter;
```

You can also custom create a filter.

```
import React from 'react';
import { Button } from 'wfui-react';
import deepEqual from 'deep-equal';
import classNames from 'classnames';

class Filter2 extends React.Component {
   constructor(props) {
       super();

       // Calculate initial caseCounts.
       this.state = {
           summary: this.contentSummary(props.contents, props.collection) || []
       };
       this.contentSummary = this.contentSummary.bind(this);
   }
   componentWillReceiveProps(nextProps) {
       const { contents, collection } = this.props;

       // reset state list if stages changed
       if (
           !deepEqual(collection, nextProps.collection) ||
           !deepEqual(contents, nextProps.contents)
       ) {
           this.setState({
               summary: this.contentSummary(
                   nextProps.contents,
                   nextProps.collection
               )
           });
       }
   }
   contentSummary(contents, collection) {
       const ret = [{ name: '', count: 0 }].concat(
           collection.map(state =>
               Object.assign({}, { name: state }, { count: 0 })
           )
       );
       contents.forEach(item => {
           const c = ret.find(s => s.name === item.type);
           if (c) c.count += 1;
           ret[0].count += 1;
       });
       return ret;
   }
   render() {
       const { intl, changeFilter, currentType } = this.props;
       const { summary } = this.state;

       return (
           <div className="item-summary dashboard-box">
               <div className="item-counts">
                   <div className="title-dashboard-box-container">
                       <label className="title-dashboard-box text-uppercase bold-text">
                           Summary Filter
                       </label>
                   </div>
                   <div className="counts clearfix">
                       {summary.map((state, i) => (
                           <div className={`count ${state.name}`} key={i}>
                               <Button
                                   bsStyle="link"
                                   className={classNames(
                                       'content-summary-btn normal-text badge-tag badge-tag-primary',
                                       {
                                           'status-selected':
                                               currentType === state.name,
                                           'badge-tag-active':
                                               (!currentType && !state.name) ||
                                               currentType === state.name
                                       }
                                   )}
                                   onClick={() =>
                                       changeFilter([
                                           {
                                               key: 'currentType',
                                               value: state.name
                                           }
                                       ])
                                   }
                               >
                                   <span className="val">
                                       <b>{state.count}</b>{' '}
                                   </span>
                                   <span className="val-label">
                                       {intl.formatMessage({
                                           id: `${
                                               state.name
                                                   ? `content_manager.summary.types.${
                                                   state.name
                                                   }`
                                                   : 'content_manager.summary.types.total'
                                               }`,
                                           defaultMessage: state.name,
                                           className: 'type'
                                       })}
                                   </span>
                               </Button>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       );
   }
}

export default Filter2;
```

2. Create filter function array
Create an array of function for each filter except searchTerm.

3. Create an array defining how each column will be structured and sorted.

|Property|Type|Description|
|--------|----|-----------|
|name|string|Column header title|
|sortingKey|function|A function returning the value to be used for sorting|
|display|function|Returns a string/component to be displayed in the cell|
|flexGrow|number|For responsive width|
|width|number|Fixed width|

4. Set what to do when selection changes (optional step)
If the filtered items are selectable, create a function what to do with the selected data.

5. Set what to do when number of data being displayed changes (optional step)

Example Code
```
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { FilteredTableV2 as FilteredTable } from 'wfui-react';

import Filter from './Filter';
import Filter2 from './Filter2';

class ContentManagement extends React.Component {
   constructor() {
       super();
       this.state = {
           showing: 0,
           selected: [],
       };
       this.getItemFormat = this.getItemFormat.bind(this);
       this.onSelectionChange = this.onSelectionChange.bind(this);
   }
   onSelectionChange(selection) {
       const { contents } = this.props;
       const newSelected = selection.map(idx => contents[idx]);
       this.setState({
           selected: newSelected
       });
   }
   getFilters() {
       const {
           visibilityFilter: {
               category: { status, currentType, dateStart, dateEnd }
           }
       } = this.props;
       return [
           item => item.type === currentType || !currentType,
           item => {
               if (item.data.attributes) {
                   const {
                       data: {
                           attributes: { published }
                       }
                   } = item;
                   switch (status) {
                       case 'published':
                           return published;
                       case 'unpublished':
                           return !published;
                       case 'draft':
                           return item.draft;
                       default:
                           return true;
                   }
               }
               return true;
           },
           item =>
               !dateStart ||
               Date.parse(item.last_modified || item.createdAt) >=
               Date.parse(dateStart),
           item =>
               !dateEnd ||
               Date.parse(item.last_modified || item.createdAt) <
               Date.parse(dateEnd) + 1000 * 3600 * 24
       ];
   }
   getItemFormat() {
       const { intl, rootPath, defaults } = this.props;
       const columnItems = [
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.title'
               }),
               sortingKey: data => data.title || 'Z',
               display: data => <div>{data.title}</div>,
               flexGrow: 1
           },
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.author'
               }),
               sortingKey: data => data.author || 'Z',
               display: data => data.author,
               flexGrow: 0,
               width: 140
           },
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.createdAt'
               }),
               sortingKey: data =>
                   data.createdAt ? new Date(data.createdAt) : new Date(1),
               display: data =>
                   data.createdAt ? (
                       <FormattedDate
                           value={new Date(data.createdAt)}
                           year="numeric"
                           month="short"
                           day="2-digit"
                       />
                   ) : (
                           ''
                       ),
               flexGrow: 0,
               width: 120
           },
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.status'
               }),
               // sortingKey: data => (data.published ? 1 : 0),
               sortingKey: data =>
                   data.lastUpdateDate
                       ? new Date(data.lastUpdateDate)
                       : new Date(1),
               display: data => (
                   <div>
                       <p className={`text-uppercase narrow-text bold-text`}>
                           <span
                               className={`${
                                   data.published
                                       ? 'published'
                                       : 'unpublished'
                                   } highlight-text`}
                           >
                               <FormattedMessage
                                   id={`content_manager.status.${
                                       data.published
                                           ? 'published'
                                           : 'unpublished'
                                       }`}
                               />
                           </span>
                           {data.draft && (
                               <span className="draft highlight-text">
                                   <FormattedMessage id="content_manager.status.draft" />
                               </span>
                           )}
                       </p>
                       <p className="narrow-text">
                           <FormattedDate
                               value={new Date(data.lastUpdateDate)}
                               year="numeric"
                               month="short"
                               day="2-digit"
                           />
                       </p>
                   </div>
               ),
               flexGrow: 0,
               width: 200
           },
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.isPublic'
               }),
               sortingKey: data => (data.isPublic_b ? 1 : 0),
               display: data => (
                   <FormattedMessage
                       id={'content_manager.status.public'}
                       values={{ public: !!data.isPublic_b }}
                   />
               ),
               flexGrow: 0,
               width: 60
           },
           {
               name: intl.formatMessage({
                   id: 'content_manager.columnLabels.kind'
               }),
               sortingKey: data => data.type,
               display: data => data.type,
               flexGrow: 0,
               width: 120
           },
       ];
       return columnItems;
   }

   render() {
       const {
           contents,
           collection,
           location,
           resetFilter,
           visibilityFilter: {
               category: { searchTerm, currentType }
           },
           changeFilter,
       } = this.props;
       const { showing, selected } = this.state;

       return (
           <div id="oicr-content-manager" className="oicr-item-management">
               <h2 className="title">
                   Title
               </h2>
               <div className="content content-dashboard clearfix">
                   <div className="itemmanagement-table casemanagement-table">
                       <div className="table-responsive">
                           <Filter
                               location={location}
                               resetFilter={resetFilter}
                               showing={showing}
                               selected={selected}
                           />
                           <Filter2
                               contents={contents}
                               collection={collection}
                               changeFilter={changeFilter}
                               currentType={currentType}
                           />
                           <div className="table-responsive">
                               <FilteredTable
                                   className="table-itemmanagement table-casemanagement table table-striped table-bordered table-condensed"
                                   filterList={this.getFilters()}
                                   searchTerm={searchTerm || ''}
                                   data={contents}
                                   itemFormat={this.getItemFormat()}
                                   onSelectionChange={
                                       this.onSelectionChange
                                   }
                                   onResultsNumUpdate={results =>
                                       this.setState({
                                           showing: results
                                       })
                                   }
                                   selectable
                                   simpleSearch
                                   wholeWord
                                   contentHeight={680}
                                   sortedIdx={3}
                               />
                           </div>
                       </div>
                   </div>
               </div>

           </div>
       );
   }
}
ContentManagement.propTypes = {
   contents: PropTypes.arrayOf(PropTypes.object),
   getContents: PropTypes.func,
   fetchContents: PropTypes.object
};

ContentManagement.defaultProps = {
   getContents: f => f,
   fetchContents: {}
};

export default ContentManagement;
```

FilteredTable Props

|Name|Type (Default Value)|Desc|className|
|----|--------------------|----|---------|
|className|string|Class name|
|paginatorDisplay|component|If filtered table is paginated, set how paginator will be displayed|
|data|array|Array of data|
|pageSize|number (100000)|Number to display per page|
|currentPage|Number (1)|Indicates what page is being displayed|
|filterList|Array of functions|Functions to be used to filter the given data|
|searchTerm|string|Search keyword|
|selectable|bool|If true, the first column becomes selections|
|onSelectionChange|function|A callback function to be called when selection changes|
|itemFormat|Array of objects|Defines how each column will be displayed|
|onResultsNumUpdate|func|A callback function to be called when number of results of filter application changes|
|onFilteredArticleUpdate|func|A callback function to be called when results (items) of filter application changes|
|simpleSearch|bool|If true, only exact word match to searchTerm will be filtered|
|searchKeys|Array of strings|If specified, the searchTerm keyword match will be made only for the specified props.|
|sortedIdx|number|Index of initial sorting column|
|defaultSortedOrientation|String (‘desc’)|Initial sorting orientation|
|wholeWord|bool|If true, only exact word match to searchTerm will be filtered|
|searchLogin|One of [‘and’, ‘or’]|Defines logic to be applied between different filters|
|onRowClick|function|A callback function to be called when a row is clicked|
|contentHeight|number|Height of the entire table|
|noTableHeader|bool|If true, the table header will not be displayed|
|rowHeight|number|Height of each row|
|headerHeight|number|Height of header|

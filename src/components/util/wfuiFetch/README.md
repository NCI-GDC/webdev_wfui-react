wfuiFetch is our customized fetch function that wraps whatwg-fetch(https://github.com/github/fetch) and adds more functionalities which we needed for our projects’ use cases.

### Redux state management
wfuiFetch manages a fetch request status using redux state. It dispatches following actions creators:
- Request time passed 5s (FETCH_REQUEST_5S)
- Request time passed 8s (FETCH_REQUEST_8S)
- Request timeout (FETCH_REQUEST_TIMEOUT)
- Successful (FETCH_SUCCESS)
- Request Failed (FETCH_FAILURE)
- Retry Request Failed (FETCH_RETRY_FAILURE)
- Data received (RECEIVE_FETCH_DATA)

And here is the example of a fetch status object that is saved in Redux. This object is retrievable by using fetchSelector selector.

```
getUserInfo {
	isFetching: false,
	fetch5s: false,
	fetch8s: false,
	status: "success",
	error: "",
	timeout: false,
	retried: false,
	lastUpdated: 1530625234532,
	requestId: "getUserInfo",
	data: { /* return value from request */ }
}
```

### Customized Messaging (5s, 8s, timeout and error)
By using the fetch status object, now it can display customized messages for each request based on a result of an API request. I will write more details in LoadingComponent, Notifications components section about how to use it.

### Retry feature after timeout
When call the wfuiFetch function, you can specify how many time to retry requests when it is failed. It can also display a retry button by using LoadingComponent which I will explain more details later.

### Cancelable request
wfuiFetch function will return a object that contains a promise, and abort function. By calling this abort(), it will cancel your API request. (It technically fetches an request, but reject a promise no matter what)
LoadingComponent
LoadingComponent is the component that designed to display a loading indicator and customized messages by using wfuiFetch status object. Following is how to use the component with wfuiFetch state object.

Example component
```
import React from 'react';
import { connect } from 'react-redux';
import { LoadingComponent, Utils } from 'wfui-react';

class Example extends React.Component {
    onRetry() {
       // call a API request function
    }
    render() {
    const { fetchStatus }
        return (
            <LoadingComponent
              {...fetchStatus}
              onRetry={this.onRetry.bind(this)}
            >
                <div>Content is loaded.</div>
            </LoadingComponent>
        );
    }
}

export default 
   connect(
       (state) => (
           {
               fetchStatus: Utils.fetchSelector('yourRequestId')(state),
           };
       ),
      {},
   )(Example),
);
```

You just need to pass an entire fetch status object to the component and it will work fine. If you pass onRetry props, the component will display a retry button when requests are failed.
Once a component is set, you can now specify translations for those different messages in react-intl messages object.

translations/en.yml
```
# Loading Component
############################################
loadingcomponent:
 message5s: 'Loading, please wait...'
 message8s: 'We are experiencing longer than normal load times.'
 messageFailed: 'The server encountered an internal error and was unable to complete your request.'
 yourRequestId:
   default: 'An unexpected error has occurred.'
   FORM_NOT_FOUND: 'The form requested is not available.'
   NO_PERM: You don't have permission to perform this action.
```

Note: API will return an error type such as NO_PERM, or FORM_NOT_FOUND and you can specify message for those cases, otherwise it display a default value.
Notifications
Notifications component is a similar component as LoadingComponent that displays feedback messages upon API requests based on those fetch status. It reduces the burden of implementing feedback everytime you create a new API request.

```
Example component
import React from 'react';
import { connect } from 'react-redux';
import { Notifications } from 'wfui-react';
import YourApplication from './YourApplication'

class Example extends React.Component {
    render() {
        return (
            <div>
                <Notifications
                    lang="en"
                    requestIds={[
                         'yourRequestId',
                         'setPageContent',
                         ....
                    ]}
                    fixed={false} // There are two different types of feedbacks.
                />
                <YourApplication />
            </div>
        );
    }
}

export default Example;
```

All you need is to specify the requestIds, once it is set, the component will display popup feedback whenever this request happens. And same as LoadingComponent, you need to specify those custom messages in your translation file.

```
translations/en.yml
# Notifications
############################################
notifications:
 createForm:
   success: 'The form: "{lang, select, en {{title_en}} fr {{title_fr}}}" has been created successfully.'
   error:
     default: Request failed. "{message}"
     NO_PERM: You don't have permission to perform this action.
 cloneForm:
   success: 'The form: "{lang, select, en {{title_en}} fr {{title_fr}}}" has been cloned successfully.'
   error:
     default: Request failed. "{message}"
     NO_PERM: You don't have permission to perform this action.
```

Note: When it received API response and data, it injects the return values to message tokens, you can display a message with return values. Please check how to write tokens here (https://formatjs.io/guides/message-syntax/)

Here is the example of how the return data is flattened.
```
{
   lang: "en",
   last_modified: '2018-07-03T15:06:11Z"',
   outdated: 1,
   data: {
     attributes: {
       alt_txt: "alt",
       subjectTag_list: [
         {title_txt: "text"}
       ]
     }
     body: "\n",
     body_html: '',
   },
}
==============⇒ will be flattened to
lang:"en"
last_modified: "2018-07-03T15:06:11Z"
outdated: 1
data_body:"\n"
data_body_html:""
data_attributes_alt_txt: "alt"
data_attributes_subjectTag_list_0_title_txt:"text"
...
```


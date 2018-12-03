import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingComponent } from '../';
import { fetchSelector } from './wfuiFetch/selectors';

class CustomQuery extends React.Component {
    render() {
        const { children, query, fetchStatus } = this.props;
        return (
            <Query query={query}>
                {props => {
                    return (
                        <LoadingComponent {...fetchStatus}>
                            {children(props)}
                        </LoadingComponent>
                    );
                }}
            </Query>
        );
    }
}

CustomQuery.propTypes = {
    query: PropTypes.object,
    fetchStatus: PropTypes.object,
    children: PropTypes.node,
};

CustomQuery.defaultProps = {
    query: {
        definitions: [],
    },
};

export default connect((state, props) => {
    let opName = '';
    const { definitions } = props.query;
    const opDef = definitions.find(
        def => def && def.kind === 'OperationDefinition',
    );
    if (opDef) {
        opName = opDef.name && opDef.name.value;
    }
    return {
        fetchStatus: fetchSelector(opName)(state) || {},
    };
})(CustomQuery);

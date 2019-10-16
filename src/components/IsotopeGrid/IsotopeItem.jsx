import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';
import { stringifyValues } from '../util/stringifyValues';
import { removeHTMLTags } from '../util/removeHTMLTags';

const columnProps = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
        size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
        order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
]);

class IsotopeItem extends React.Component {
    render() {
        const {
            index,
            id,
            width,
            xs,
            sm,
            md,
            lg,
            children,
            item,
            className,
            specifySizer,
            itemDisplay,
            stringifyField,
            disableItemStringify,
        } = this.props;
        const elems = [];

        if (!itemDisplay) return null;

        if (Array.isArray(children)) {
            children.forEach((elem) => {
                if (Array.isArray(elem)) {
                    elem.forEach(i => elems.push(i));
                } else {
                    elems.push(elem);
                }
            });
        } else {
            elems.push(children);
        }

        if (width) {
            return (
                <div
                    key={index}
                    id={`${id}-item-${index}`}
                    className={classNames(
                        className,
                        `${id}-item ${
                            index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''
                        }`,
                        'wfui-isotope-item',
                    )}
                    style={{ width: `${width}px` }}
                    data-item={
                        !disableItemStringify &&
                        (stringifyField
                            ? item[stringifyField]
                            : removeHTMLTags(stringifyValues(item)))
                    }
                >
                    {itemDisplay
                        ? cloneElement(
                              itemDisplay,
                              Object.assign({}, this.props, { id: undefined }),
                          )
                        : elems.map((child, ind) =>
                              cloneElement(
                                  child,
                                  Object.assign({}, this.props, { id: undefined, key: ind }),
                              ),
                          )}
                </div>
            );
        }

        return (
            <Col
                key={index}
                id={`${id}-item-${index}`}
                className={classNames(
                    className,
                    `${id}-item ${index} ${
                        index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''
                    }`,
                    'wfui-isotope-item',
                )}
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                data-item={
                    !disableItemStringify &&
                    (stringifyField ? item[stringifyField] : removeHTMLTags(stringifyValues(item)))
                }
            >
                {itemDisplay
                    ? cloneElement(
                          itemDisplay,
                          Object.assign({}, this.props, { id: undefined, className: undefined }),
                      )
                    : elems.map((child, ind) =>
                          cloneElement(
                              child,
                              Object.assign({}, this.props, {
                                  id: undefined,
                                  className: undefined,
                                  key: ind,
                              }),
                          ),
                      )}
            </Col>
        );
    }
}

IsotopeItem.propTypes = {
    stringifyField: PropTypes.string,
    index: PropTypes.number,
    id: PropTypes.string,
    width: PropTypes.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: PropTypes.node,
    item: PropTypes.any,
    className: PropTypes.string,
    specifySizer: PropTypes.bool,
    itemDisplay: PropTypes.element,
    disableItemStringify: PropTypes.bool,
};

IsotopeItem.defaultProps = {
    role: 'item',
};

export default IsotopeItem;

import React from 'react';

const Test = ({ var1, var2 }) => (
      <div>
                  <div>
                        <div>
                            <div>
                                Test
                            </div>
                        </div>
                  </div>
            </div>
);

const Test2 = ( props ) => {
   const newChildren = React.Children.toArray(props.children);
   newChildren.push(<div>CATS</div>);
   const test = React.cloneElement(props.lol, {children: <i> WHAT IS UP </i> });
   console.log(props);
   return (
      <div>
      </div>
   );
};

export { Test };
export { Test2 };


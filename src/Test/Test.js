import React from 'react';

const Test = ({ var1, var2, content }) => (
      <div>
         Var1: { var1 }
         Var2: { var2 }
         Hello: { content }
      </div>
);

const Test2 = ( props ) => {
   const newChildren = React.Children.toArray(props.children);
   newChildren.push(<div>CATS</div>);
   return (
      <div>
            { console.log( props ) }
            { React.cloneElement(<cat />, { children:newChildren }) }
      </div>
   );
};

export { Test };
export { Test2 };


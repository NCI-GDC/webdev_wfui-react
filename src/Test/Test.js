import React from 'react';

const Test = ({ var1, var2, content }) => (
      <div>
         Var1: { var1 }
         Var2: { var2 }
         Hello: { content }
      </div>
);

const Test2 = ({ itemAsProp }) => {
   const additionalProps = {
      content: 'Testing',
   };
   React.cloneElement(itemAsProp, additionalProps);
   return itemAsProp;
};

export { Test };
export { Test2 };


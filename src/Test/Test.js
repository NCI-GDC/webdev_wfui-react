import React from 'react';

const Test = ({var1, var2}) => (
      <div>
         Var1: { var1 }
         Var2: { var2 }
      </div>
);

const Test2 = ({itemAsProp}) => {
   console.log(itemAsProp);
   return itemAsProp;
};

export { Test };
export { Test2 };


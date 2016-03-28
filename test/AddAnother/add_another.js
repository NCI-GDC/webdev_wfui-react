
// const testAddAnother = () => {
//   var state0 = []
//   var state1 = [
//     {
//       id: 0,
//       component: <div>AIUEO</div>,
//       edited: false
//     }
//   ]
//   var state1 = [
//     {
//       id: 0,
//       component: <div>AIUEO</div>,
//       edited: false
//     }
//   ]
//   var state2 = [
//     {
//       id: 0,
//       component: <div>AIUEO</div>,
//       edited: false
//     },
//     {
//       id: 1,
//       component: <div>KAKIKUKEKO</div>,
//       edited: false
//     }
//   ]
//   var state3 = [
//     {
//       id: 0,
//       component: <div>AIUEO</div>,
//       edited: false
//     },
//     {
//       id: 1,
//       component: <div>KAKIKUKEKO</div>,
//       edited: true
//     }
//   ]
//   var state4 = [
//     {
//       id: 1,
//       component: <div>KAKIKUKEKO</div>,
//       edited: true
//     }
//   ]
//   deepFreeze(state0);
//   deepFreeze(state1);
//   deepFreeze(state2);
//   deepFreeze(state3);
//   deepFreeze(state4);
  
//   expect(anothersReducer(state0, addAnotherAction(<div>AIUEO</div>))).eql(state1)
//   expect(anothersReducer(state1, addAnotherAction(<div>KAKIKUKEKO</div>))).eql(state2)
//   expect(anothersReducer(state2, editAnotherAction(1))).eql(state3);
//   expect(anothersReducer(state3, removeAnotherAction(0))).eql(state4);
//   console.log('test passed');
// }
// testAddAnother();
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//Stateless functional components
// import React from 'react';
// const MyComponent = (props) => {
//   return (
//     <div>
//       <h1>MyComponent is here ! {props.name}</h1>
//     </div>
//   );
// };

Meteor.startup(() => {
  Session.set('showVisible', true);


  // Meteor.call('greetUser', 'Ionela', (err, res) => {
  //   console.log('Greet User Arguments', err, res);
  // });
  // Meteor.call('addNumbers', 11, 101, (err, res) => {
  //   console.log('result is', res);
  // })
  //<MyComponent name="Mike"/>
  ReactDOM.render(routes, document.getElementById('app'));
});

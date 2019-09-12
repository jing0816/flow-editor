import React from 'react';
import ReactDOM from 'react-dom';
import FlowEditor from '../src';

class Demo extends React.Component {
  componentDidMount () {}
  render(){
    return (
      <FlowEditor />
    );
  }
}
ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
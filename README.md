#### flow-chart

g6-editor
     
属性|类型|默认|值范围|说明
---|:--:|---:|---:|---:
- | - | - | - | -
  
  
------
  
#### Code 演示
  
```
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
```
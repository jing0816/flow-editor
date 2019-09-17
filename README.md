#### flow-chart

参考g6-editor
     
属性|类型|默认|值范围|说明
---|:--:|---:|---:|---:
defaultValue | Object | - | object | 默认值
onSave | Function | - | function | 保存回到方法，返回数据格式同`defaultValue`
  
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
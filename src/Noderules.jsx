import React from 'react';
import PropTypes from 'prop-types';
import { Button, Select, Input, Icon, Cascader } from 'antd';
import G6Editor from './g6Editor';
import './noderules.css';

const { Option } = Select;
class Noderules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
    };
  }
  
  render() {
    return (
      <>
        <Button className="rules-btn" type="primary" ghost size="small">新增规则</Button>
        <div className="rules-group">
          <Icon className="rules-close" type="close" />
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Input
            size="small"
            className="input name-input"
            placeholder="规则内容"
            // value={lineLogicExpression}
            // onChange={ev => handleChange(ev, 'lineLogicExpression')}
            // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
          />
        </div>
        <div className="rules-group">
          <Icon className="rules-close" type="close" />
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select size="small">
            <Option title="333" value="jack">规则规则规则</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Input
            size="small"
            className="input name-input"
            placeholder="规则内容"
            // value={lineLogicExpression}
            // onChange={ev => handleChange(ev, 'lineLogicExpression')}
            // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
          />
        </div>
      </>
    );
  }
}
export default Noderules;

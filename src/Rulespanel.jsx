import React from 'react';
import PropTypes from 'prop-types';
import G6Editor from './g6Editor';
import { Button, Select, Input, Icon, Cascader } from 'antd';
import './rulespanel.css';

class Rulespanel extends React.Component {
  static propTypes = {
    createDetailpanel: PropTypes.func,
    editor: PropTypes.object,
    content: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.rulespanelRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createDetailpanel = this.getCreateDetailpanel();
    const rules = createDetailpanel(this.rulespanelRef.current);
    editor.add(rules);
  }

  getCreateDetailpanel() {
    const { createDetailpanel } = this.props;
    return createDetailpanel || this.createDetailpanel;
  }

  createDetailpanel(container) {
    return new G6Editor.Detailpanel({
      container,
    });
  }
  
  render() {
    return (
      <div className="rulespanel" ref={this.rulespanelRef}>
        <div data-status="node-selected" className="panel">
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
        </div>
      </div>
    );
  }
}
export default Rulespanel;

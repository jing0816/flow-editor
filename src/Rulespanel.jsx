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
    this.state = {
      list: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false,
        },
      ],
    };
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

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }
  
  render() {
    const { list } = this.state;

    return (
      <div className="rulespanel" ref={this.rulespanelRef}>
        <div data-status="node-selected" className="panel">
          <Button className="rules-btn" type="primary" ghost size="small">新增规则</Button>
          <div className="rules-box">
            <div className="rules-group">
              <Icon className="rules-close" type="close" />
              <Cascader
                className="rules-type"
                size="small"
                placeholder="请选择类型规则"
                options={list}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
              <Select size="small" className="rules-param" placeholder="请选择参数来源">
                <Option title="333" value="jack">规则规则规则</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Input
                size="small"
                className="input rules-content"
                placeholder="请填写规则内容"
                // value={lineLogicExpression}
                // onChange={ev => handleChange(ev, 'lineLogicExpression')}
                // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
              />
            </div>
            <div className="rules-group">
              <Icon className="rules-close" type="close" />
              <Cascader
                className="rules-type"
                size="small"
                placeholder="请选择类型规则"
                options={list}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
              <Select size="small" className="rules-param" placeholder="请选择参数来源">
                <Option title="333" value="jack">规则规则规则</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Input
                size="small"
                className="input rules-content"
                placeholder="请填写规则内容"
                // value={lineLogicExpression}
                // onChange={ev => handleChange(ev, 'lineLogicExpression')}
                // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
              />
            </div>
          
            <div className="rules-group">
              <Icon className="rules-close" type="close" />
              <Cascader
                className="rules-type"
                size="small"
                placeholder="请选择类型规则"
                options={list}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
              <Select size="small" className="rules-param" placeholder="请选择参数来源">
                <Option title="333" value="jack">规则规则规则</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Input
                size="small"
                className="input rules-content"
                placeholder="请填写规则内容"
                // value={lineLogicExpression}
                // onChange={ev => handleChange(ev, 'lineLogicExpression')}
                // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Rulespanel;

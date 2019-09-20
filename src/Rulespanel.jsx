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
      data: [
        {
          type: [
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
          param: '',
          content: '',
        },
        {
          type: [
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
          param: '',
          content: '',
        },
      ],
    };
    this.rulespanelRef = React.createRef();
    this.rulesboxRef = React.createRef();
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

  loadData(selectedOptions, i) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

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
        options: [...this.state.data],
      });
    }, 1000);
  }

  onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
  }

  add = () => {
    const { data } = this.state;
    data.push({
      type: [
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
      param: '',
      content: '',
    });
    this.setState({
      data,
    });
    setTimeout(() => {
      this.rulesboxRef.current.scrollTop = 46 * data.length;
    }, 1);
  }

  del(i) {
    const { data } = this.state;
    data.splice(i, 1)
    this.setState({
      data,
    });
  }

  typeChange = value => {
    // console.log(value);
  }
  
  render() {
    const { data } = this.state;

    return (
      <div className="rulespanel" ref={this.rulespanelRef}>
        <div data-status="node-selected" className="panel">
          <Icon type="down" />
          <Button
            className="rules-btn"
            type="primary"
            ghost
            size="small"
            onClick={this.add}
          >
            新增规则
          </Button>
          <div className="rules-box" ref={this.rulesboxRef}>
            {
              data.map((v, i) => {
                return (
                  <div key={i} className="rules-group">
                    <Icon className="rules-close" type="close" onClick={() => this.del(i)} />
                    <Cascader
                      className="rules-type"
                      size="small"
                      placeholder="请选择类型规则"
                      options={v.type}
                      loadData={selectedOptions => this.loadData(selectedOptions, i)}
                      onChange={this.typeChange}
                      changeOnSelect
                    />
                    <Select
                      size="small"
                      className="rules-param"
                      placeholder="请选择参数来源"
                      // onChange={this.handleChange(data)}
                    >
                      <Option title="333" value="jack">规则规则规则</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <Input
                      size="small"
                      className="input rules-content"
                      placeholder="请填写规则内容"
                      // value={lineLogicExpression}
                      // onChange={ev => handleChange}
                      // onBlur={ev => handleBlur(ev, 'lineLogicExpression')}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Rulespanel;

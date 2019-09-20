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
          typeVal: '',
          param: [],
          paramVal: '',
          contentVal: '',
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
          typeVal: '',
          param: [],
          paramVal: '',
          contentVal: '',
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

  loadData(selectedOptions, i) {
    const { data } = this.state;
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
      data[i].param = [{
        name: `${targetOption.label} Dynamic 1`,
        value: `${targetOption.label} Dynamic 1`,
      },{
        name: `${targetOption.label} Dynamic 2`,
        value: `${targetOption.label} Dynamic 2`,
      }];
      this.setState({
        data: [...this.state.data],
      });
    }, 1000);
  }

  typeChange(value, i) {
    const { data } = this.state;
    const val = data[i].typeVal;
    if(val !== '') {
      data[i].paramVal = val.join(',') !== value.join(',') ? '' : data[i].paramVal;
    }
    data[i].typeVal = value;
    this.setState({
      data: [...this.state.data],
    });
  }

  paramChange(value, i) {
    const { data } = this.state;
    data[i].paramVal = value;
    this.setState({
      data: [...this.state.data],
    });
  }

  contentChange(ev, i) {
    const { data } = this.state;
    data[i].contentVal = ev.target.value;
    this.setState({
      data: [...this.state.data],
    });
  }

  contentBlur(ev, i) {
    
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
                      onChange={value => this.typeChange(value, i)}
                      defaultValue={["zhejiang", "dynamic1"]}
                      value={v.typeVal}
                    />
                    <Select
                      size="small"
                      className="rules-param"
                      placeholder="请选择参数来源"
                      defaultValue="Zhejiang Dynamic 2"
                      value={v.paramVal}
                      onChange={value => this.paramChange(value, i)}
                    >
                      {
                        v.param.length && v.param.map((m, n) => {
                          return <Option key={m.value} value={m.value}>{m.name}</Option>;
                        })
                      }
                    </Select>
                    <Input
                      size="small"
                      className="input rules-content"
                      placeholder="请填写规则内容"
                      value={v.contentVal}
                      onChange={ev => this.contentChange(ev, i)}
                      onBlur={ev => this.contentBlur(ev, i)}
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

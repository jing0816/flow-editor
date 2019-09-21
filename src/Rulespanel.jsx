import React from 'react';
import PropTypes from 'prop-types';
import G6Editor from './g6Editor';
import { Button, Select, Input, Icon, Cascader } from 'antd';
import './rulespanel.css';

const formatData = data => {
  const arr = [];
  if(data) {
    data.map(v => {
      arr.push({
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
        typeVal: [data.ruleType, data.ruleConfigId],
        param: [],
        paramVal: data.paramType,
        contentVal: data.inputParam,
      });
    });
    return arr;
  } else {
    return false;
  }
}
class Rulespanel extends React.Component {
  static propTypes = {
    createDetailpanel: PropTypes.func,
    editor: PropTypes.object,
    content: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      prevPropData: '',
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

  // static getDerivedStateFromProps(props, state) {
  //   const { data } = props;
  //   const dataArr = formatData(data);
  //   if(JSON.stringify(dataArr) !== JSON.stringify(state.prevPropData)) {
  //     return {
  //       data: dataArr,
  //       prevPropData: dataArr,
  //     };
  //   }
  //   return null;
  // }

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
    const arr = data || [];
    arr.push({
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
    });
    this.setState({
      data: arr,
    });
    setTimeout(() => {
      this.rulesboxRef.current.scrollTop = 46 * arr.length;
    }, 1);
  }

  del(i) {
    const { data } = this.state;
    data.splice(i, 1)
    this.setState({
      data,
    });
  }

  loadData(selectedOptions, i, data) {
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

  typeChange(value, i, data) {
    const { onChange } = this.props;
    const val = data[i].typeVal;
    if(val !== '') {
      data[i].paramVal = JSON.stringify(val) !== JSON.stringify(value) ? '' : data[i].paramVal;
    }
    data[i].typeVal = value;
    this.setState({
      data,
    });
    if(onChange) {
      onChange(this.formatChangeData(data));
    }
  }

  paramChange(value, i) {
    const { onChange } = this.props;
    const { data } = this.state;
    data[i].paramVal = value;
    this.setState({
      data: [...this.state.data],
    });
    if(onChange) {
      onChange(this.formatChangeData(data));
    }
  }

  contentChange(ev, i) {
    const { data } = this.state;
    data[i].contentVal = ev.target.value;
    this.setState({
      data: [...this.state.data],
    });
  }

  contentBlur(ev, i) {
    const { onChange } = this.props;
    const { data } = this.state;
    data[i].contentVal = ev.target.value;
    if(onChange) {
      onChange(this.formatChangeData(data));
    }
  }

  formatChangeData(data) {
    const arr = [];
    data.map(v => {
      if(v.typeVal || v.paramVal || v.contentVal) {
        arr.push({
          ruleConfigId: v.typeVal[1],
          ruleType: v.typeVal[0],
          paramType: v.paramVal,
          inputParam: v.contentVal,
        });
      }
    });
    return arr;
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
              data && data.map((v, i) => {
                return (
                  <div key={i} className="rules-group">
                    <Icon className="rules-close" type="close" onClick={() => this.del(i)} />
                    <Cascader
                      className="rules-type"
                      size="small"
                      placeholder="请选择类型规则"
                      options={v.type}
                      loadData={selectedOptions => this.loadData(selectedOptions, i, data)}
                      onChange={value => this.typeChange(value, i, data)}
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

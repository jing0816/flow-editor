import React from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import ToolBar from './Toolbar';
import Contextmenu from './Contextmenu';
import Itempanel from './Itempanel';
import Detailpanel from './Detailpanel';
import Navigator from './Navigator';
import Page from './Page';
import Rulespanel from './Rulespanel';
import 'rc-color-picker/assets/index.css';
import './baseFlowEditor.css';

export default class BaseFlowEditor extends Editor {
  static propTypes = {
    bpmTemplateVersionId: PropTypes.number,
    defaultValue: PropTypes.object,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: {
      edges: [{
        id: "24b9c7e6",
        index: 1,
        shape: "flow-polyline-round",
        source: "ddd8aaf5",
        sourceAnchor: 1,
        target: "74bb9f0a",
        targetAnchor: 3,
        memo: '备注',
        label: 'a<=10',
      }],
      nodes: [{
        color: "#00cc8a",
        id: "ddd8aaf5",
        index: 0,
        label: "开始",
        nodetype: "0",
        shape: "flow-circle",
        size: "72*72",
        type: "node",
        x: 113,
        y: 48,
        message: '备注',
        lineLogicExpression: '1&2',
        paramCallback: 'http://www.liepin.com',
        ruleFormList: [
          {
            inputParam: "dageae",
            paramType: "Zhejiang Dynamic 1",
            ruleConfigId: "dynamic2",
            ruleType: "zhejiang",
          }
        ],
      }, {
        color: "#1890FF",
        id: "74bb9f0a",
        index: 2,
        label: "常规节点",
        nodetype: "2",
        shape: "flow-rect",
        size: "80*48",
        type: "node",
        x: 362.5,
        y: 48,
      }]
    },
  };

  componentDidMount() {
    super.componentDidMount();
    const editor = this.editor;
    const page = editor.getCurrentPage();
    page.changeAddEdgeModel({
      shape: 'flow-polyline-round',
    });
  }

  colorClose = ev => {
    this.updateGraph('color', ev.color);
  }

  sizeChange(value, val, type) {
    const { selectedModel } = this.state;
    let newSize;
    if(type === 'height') {
      newSize = value + '*' + val;
    } else if(type === 'width') {
      newSize = val + '*' + value;
    }
    selectedModel.size = newSize;
    this.setState({
      selectedModel,
    });
    this.updateGraph('size', newSize);
  }

  handleChange = (ev, key) => {
    const stateObj = {};
    stateObj[key] = ev.target.value;
    this.setState(stateObj);
  }

  handleBlur = (ev, key) => {
    const stateObj = {};
    stateObj[key] = null;
    this.updateGraph(key, ev.target.value);
  }

  rulesChange = data => {
    this.setState({
      ruleFormList: data,
    });
    this.updateGraph('ruleFormList', data);
  }
  
  render() {
    const { onSave, defaultValue } = this.props;
    const { curZoom, minZoom, maxZoom, selectedModel, label, memo, lineLogicExpression, message, paramCallback, ruleFormList } = this.state;
    
    return (
      <div className="editor">
        <ToolBar editor={this.editor} />
        <div className="bottom-container">
          <Contextmenu editor={this.editor} />
          <Itempanel editor={this.editor} />
          <Detailpanel
            label={label}
            selectedModel={selectedModel}
            editor={this.editor}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            colorClose={this.colorClose}
            sizeChange={this.sizeChange}
            toggleGrid={this.toggleGrid}
            memo={memo}
            message={message}
            lineLogicExpression={lineLogicExpression}
            paramCallback={paramCallback}
          />
          <Rulespanel
            editor={this.editor}
            data={ruleFormList}
            onChange={this.rulesChange}
          />
          <Navigator
            editor={this.editor}
            curZoom={curZoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            changeZoom={this.changeZoom}
          />
          <Page
            defaultValue={defaultValue}
            onSave={onSave}
            editor={this.editor}
          />
        </div>
      </div>
    );
  }
}

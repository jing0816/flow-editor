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
    defaultValue: PropTypes.object,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: {
      // edges: [{
      //   id: "f59d2d4e",
      //   index: 2,
      //   shape: "flow-polyline-round",
      //   source: "9662ab81",
      //   sourceAnchor: 1,
      //   target: "160e2d67",
      //   targetAnchor: 3,
      // }],
      // nodes: [{
      //   color: "#FA8C16",
      //   id: "9662ab81",
      //   index: 0,
      //   label: "起止节点",
      //   shape: "flow-circle",
      //   size: "72*72",
      //   type: "node",
      //   x: 173,
      //   y: 69,
      // }, {
      //   color: "#1890FF",
      //   id: "160e2d67",
      //   index: 1,
      //   label: "常规节点",
      //   shape: "flow-rect",
      //   size: "80*48",
      //   type: "node",
      //   x: 409,
      //   y: 69,
      // }]
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
  
  render() {
    const { onSave, defaultValue } = this.props;
    const { curZoom, minZoom, maxZoom, selectedModel, label, memo, lineLogicExpression } = this.state;
    
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
            lineLogicExpression={lineLogicExpression}
          />
          <Rulespanel editor={this.editor} />
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

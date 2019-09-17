import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, InputNumber } from 'antd';
import ColorPicker from 'rc-color-picker'
import Editor from './Editor';
import ToolBar from './Toolbar';
import Contextmenu from './Contextmenu';
import Itempanel from './Itempanel';
import Detailpanel from './Detailpanel';
import Navigator from './Navigator';
import Page from './Page';
import 'rc-color-picker/assets/index.css';
import './baseFlowEditor.css';

export default class BaseFlowEditor extends Editor {
  static propTypes = {
    defaultValue: PropTypes.object,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: {
      edges: [{
        id: "f59d2d4e",
        index: 2,
        shape: "flow-polyline-round",
        source: "9662ab81",
        sourceAnchor: 1,
        target: "160e2d67",
        targetAnchor: 3,
      }],
      nodes: [{
        color: "#FA8C16",
        id: "9662ab81",
        index: 0,
        label: "起止节点",
        shape: "flow-circle",
        size: "72*72",
        type: "node",
        x: 173,
        y: 69,
      }, {
        color: "#1890FF",
        id: "160e2d67",
        index: 1,
        label: "常规节点",
        shape: "flow-rect",
        size: "80*48",
        type: "node",
        x: 409,
        y: 69,
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

  nameChange = ev => {
    this.setState({
      inputingLabel: ev.target.value,
    });
  }

  nameBlur = ev => {
    this.updateGraph('label', ev.target.value);
    this.setState({
      inputingLabel: null,
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
  
  render() {
    const { onSave, defaultValue } = this.props;
    const { curZoom, minZoom, maxZoom, selectedModel, inputingLabel } = this.state;
    const splitSize = selectedModel.size ? selectedModel.size.split('*') : '';
    const width = splitSize[0];
    const height = splitSize[1];
    const labelInput = (
      <div className="p">
        名称：
        <Input
          size="small"
          className="input name-input"
          value={inputingLabel || selectedModel.label}
          onChange={this.nameChange}
          onBlur={this.nameBlur}
        />
      </div>
    );
    const colorInput = (
      <div className="p">
        颜色：
        <ColorPicker
          animation="slide-up"
          className="color-picker"
          color={selectedModel.color}
          onClose={this.colorClose}
        />
      </div>
    );

    return (
      <div className="editor">
        <ToolBar editor={this.editor} />
        <div className="bottom-container">
          <Contextmenu editor={this.editor} />
          <Itempanel editor={this.editor} />
          <Detailpanel editor={this.editor} content={
            <>
              <div data-status="node-selected" className="panel">
                <div className="panel-title">节点</div>
                <div className="block-container">
                  {labelInput}
                  <div className="p">
                    尺寸：
                    <InputNumber
                      size="small"
                      value={width}
                      className="input width-input"
                      onChange={value => this.sizeChange(value, height, 'height')}
                    />
                    <InputNumber
                      size="small"
                      value={height}
                      className="input height-input"
                      onChange={value => this.sizeChange(value, width, 'width')}
                    />
                  </div>
                  {colorInput}
                </div>
              </div>
              <div data-status="edge-selected" className="panel" id="edge_detailpanel">
                <div className="panel-title">边</div>
                <div className="block-container">
                  {labelInput}
                </div>
              </div>
              <div data-status="group-selected" className="panel" id="group_detailpanel">
                <div className="panel-title">组</div>
                <div className="block-container">
                  {labelInput}
                </div>
              </div>
              <div data-status="canvas-selected" className="panel" id="canvas_detailpanel">
                <div className="panel-title">画布</div>
                <div className="block-container">
                  <Checkbox onChange={ this.toggleGrid.bind(this) } >网格对齐</Checkbox>
                </div>
              </div>
              <div data-status="multi-selected" className="panel" id="multi_detailpanel">
                <div className="panel-title">多选</div>
                <div className="block-container">
                  {colorInput}
                </div>
              </div>
            </>
          }/>
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

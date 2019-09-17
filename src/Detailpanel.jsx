import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, InputNumber } from 'antd';
import ColorPicker from 'rc-color-picker';
import G6Editor from './g6Editor';
import './detailpanel.css';

class Detailpanel extends React.Component {
  static propTypes = {
    createDetailpanel: PropTypes.func,
    editor: PropTypes.object,
    content: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.detailpanelRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createDetailpanel = this.getCreateDetailpanel();
    const detailpanel = createDetailpanel(this.detailpanelRef.current);
    editor.add(detailpanel);
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
    const { selectedModel, inputingLabel, nameChange, nameBlur, colorClose, sizeChange, toggleGrid } = this.props;
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
          onChange={nameChange}
          onBlur={nameBlur}
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
          onClose={colorClose}
        />
      </div>
    );

    return (
      <div className="detailpanel" ref={this.detailpanelRef}>
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
                onChange={value => sizeChange(value, height, 'height')}
              />
              <InputNumber
                size="small"
                value={height}
                className="input height-input"
                onChange={value => sizeChange(value, width, 'width')}
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
            <Checkbox onChange={toggleGrid} >网格对齐</Checkbox>
          </div>
        </div>
        <div data-status="multi-selected" className="panel" id="multi_detailpanel">
          <div className="panel-title">多选</div>
          <div className="block-container">
            {colorInput}
          </div>
        </div>
      </div>
    );
  }
}
export default Detailpanel;

import React from 'react';
import PropTypes from 'prop-types';
import G6Editor from './g6Editor';
import './toolbar.css';
class Toolbar extends React.Component {
  static propTypes = {
    createToolbar: PropTypes.func,
    editor: PropTypes.object,
  }
  
  constructor(props) {
    super(props);
    this.toolbarRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createToolbar = this.getCreateToolbar();
    const toolbar = createToolbar(this.toolbarRef.current);
    editor.add(toolbar);
  }

  getCreateToolbar() {
    const { createToolbar } = this.props;
    return createToolbar || this.createToolbar;
  }

  createToolbar(container) {
    return new G6Editor.Toolbar({
      container
    });
  }

  render() {
    return (
      <div className="toolbar" ref={this.toolbarRef}>
        <i data-command="undo" className="command iconfont icon-undo" title="撤销"></i>
        <i data-command="redo" className="command iconfont icon-redo" title="重做"></i>
        <span className="separator"></span>
        <i data-command="copy" className="command iconfont icon-copy-o" title="复制"></i>
        <i data-command="paste" className="command iconfont icon-paster-o" title="粘贴"></i>
        <i data-command="delete" className="command iconfont icon-delete-o" title="删除"></i>
        <span className="separator"></span>
        <i data-command="zoomIn" className="command iconfont icon-zoom-in-o" title="放大"></i>
        <i data-command="zoomOut" className="command iconfont icon-zoom-out-o" title="缩小"></i>
        <i data-command="autoZoom" className="command iconfont icon-fit" title="适应画布"></i>
        <i data-command="resetZoom" className="command iconfont icon-actual-size-o" title="实际尺寸"></i>
        <span className="separator"></span>
        <i data-command="toBack" className="command iconfont icon-to-back" title="层级后置"></i>
        <i data-command="toFront" className="command iconfont icon-to-front" title="层级前置"></i>
        <span className="separator"></span>
        <i data-command="multiSelect" className="command iconfont icon-select" title="多选"></i>
        <i data-command="addGroup" className="command iconfont icon-group" title="成组"></i>
        <i data-command="unGroup" className="command iconfont icon-ungroup" title="解组"></i>
      </div>
    );
  }
}

export default Toolbar;

import React from 'react';
import PropTypes from 'prop-types';
import G6Editor from './g6Editor';
import './contextmenu.css';

class Contextmenu extends React.Component {
  static propTypes = {
    createContextmenu: PropTypes.func,
    editor: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.contextmenuRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createContextmenu = this.getCreateContextmenu();
    const contextmenu = createContextmenu(this.contextmenuRef.current);
    editor.add(contextmenu);
    // const Command = G6Editor.Command;
    // Command.registerCommand('delete', {
    //   enable(a) {
    //     console.log(a);
    //     // return true;
    //   }
    // });
  }

  getCreateContextmenu() {
    const { createContextmenu } = this.props;
    return createContextmenu || this.createContextmenu;
  }

  createContextmenu(container) {
    return new G6Editor.Contextmenu({
      container,
    });
  }
  
  render() {
    return (
      <div className="contextmenu" ref={this.contextmenuRef}>
        <div data-status="node-selected" className="menu">
          <div data-command="copy" className="command">
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="delete" className="command">
            <span>删除</span>
            <span>delete</span>
          </div>
        </div>
        <div data-status="edge-selected" className="menu">
          <div data-command="delete" className="command">
            <span>删除</span>
            <span>delete</span>
          </div>
        </div>
        <div data-status="group-selected" className="menu">
          <div data-command="copy" className="command">
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="delete" className="command">
            <span>删除</span>
            <span>delete</span>
          </div>
          <div data-command="unGroup" className="command">
            <span>解组</span>
            <span>unGroup</span>
          </div>
        </div>
        <div data-status="canvas-selected" className="menu">
          <div data-command="undo" className="command">
            <span>撤销</span>
            <span>undo</span>
          </div>
          <div data-command="redo" className="command">
            <span>重做</span>
            <span>redo</span>
          </div>
          <div data-command="pasteHere" className="command">
            <span>粘贴</span>
            <span>pasteHere</span>
          </div>
        </div>
        <div data-status="multi-selected" className="menu">
          <div data-command="copy" className="command">
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="paste" className="command">
            <span>粘贴</span>
            <span>paste</span>
          </div>
          <div data-command="addGroup" className="command">
            <span>归组</span>
            <span>addGroup</span>
          </div>
          <div data-command="delete" className="command">
            <span>删除</span>
            <span>delete</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Contextmenu;

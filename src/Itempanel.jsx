import React from 'react';
import PropTypes from 'prop-types';
import G6Editor from './g6Editor';
import './itempanel.css';

class Itempanel extends React.Component {
  static propTypes = {
    createItempanel: PropTypes.func,
    editor: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.itempanelRef = React.createRef();
  }

  getCreateItempanel() {
    const { createItempanel } = this.props;
    return createItempanel || this.createItempanel;
  }

  createItempanel(container) {
    return new G6Editor.Itempanel({
      container
    });
  }
  
  componentDidMount() {
    const { editor } = this.props;
    const createItempanel = this.getCreateItempanel();
    const itempanel = createItempanel(this.itempanelRef.current);
    editor.add(itempanel);
  }

  render() {
    return (
      <div className="itempanel" ref={this.itempanelRef}>
        <img draggable="false" src={require("./images/circle.svg")}
          data-type="node" data-shape="flow-circle" data-size="72*72" data-color="#FA8C16" data-label="起止节点" className="getItem" />
        <img draggable="false" src={require("./images/rect.svg")} data-type="node" data-shape="flow-rect" data-size="80*48" data-color="#1890FF" data-label="常规节点" className="getItem" />
        {/* <img draggable="false" src={require("./images/rhombus.svg")} data-type="node" data-shape="flow-rhombus" data-size="80*72" data-color="#13C2C2" data-label="分叉节点" className="getItem" />
        <img draggable="false" src={require("./images/capsule.svg")} data-type="node" data-shape="flow-capsule" data-size="80*48" data-color="#722ED1" data-label="模型节点" className="getItem" /> */}
      </div>
    );
  }
}

export default Itempanel;

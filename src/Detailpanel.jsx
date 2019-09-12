import React from 'react';
import PropTypes from 'prop-types';
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
    const { content } = this.props;
    return (
      <div className="detailpanel" ref={this.detailpanelRef}>
        {content}
      </div>
    );
  }
}
export default Detailpanel;

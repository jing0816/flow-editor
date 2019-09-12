import React from 'react';
import G6Editor from './g6Editor';
import PropTypes from 'prop-types';
import './page.css';
class Page extends React.Component {
  static propTypes = {
    createPage: PropTypes.func,
    editor: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.pageRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createPage = this.getCreatePage();
    const page = createPage(this.pageRef.current);
    editor.add(page);
  }

  getCreatePage() {
    const { createPage } = this.props;
    return createPage || this.createPage;
  }

  createPage(container) {
    const height = window.innerHeight - 38;
    return new G6Editor.Flow({
      graph: {
        container,
        height,
      },
      align: {
        grid: true,
      }
    });
  }
  
  render() {
    return <div className="page" ref={this.pageRef} />;
  }
}

export default Page;

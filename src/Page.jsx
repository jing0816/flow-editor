import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import G6Editor from './g6Editor';
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
    const { editor, defaultValue } = this.props;
    const createPage = this.getCreatePage();
    this.page = createPage(this.pageRef.current);
    editor.add(this.page);
    this.page.read(defaultValue);
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

  handleClick = () => {
    const { onSave } = this.props;
    if(onSave) {
      save(this.page.save());
    }
    console.log(this.page.save());
  }
  
  render() {
    return (
      <>
        <div className="page" ref={this.pageRef} />
        <Button className="save" type="primary" onClick={this.handleClick}>保存</Button>
      </>
    );
  }
}

export default Page;

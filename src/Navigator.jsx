import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Slider, Icon } from 'antd';
import G6Editor from './g6Editor';
import './navigator.css';

class Navigator extends React.Component {
  static propTypes = {
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    curZoom: PropTypes.number,
    changeZoom: PropTypes.func,
    createMinimap: PropTypes.func,
    editor: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.minimapRef = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;
    const createMinimap = this.getCreateMinimap();
    const minimap = createMinimap(this.minimapRef.current);
    editor.add(minimap);
  }

  getCreateMinimap() {
    const { createMinimap } = this.props;
    return createMinimap || this.createMinimap;
  }

  createMinimap(container) {
    return new G6Editor.Minimap({
      container,
      height: 120,
      width: 200,
    });
  }
  
  sliderTipFormatter = num => {
    const { minZoom, maxZoom } = this.props;
    const zoom = Math.ceil(num * (maxZoom - minZoom) + minZoom * 100);
    return zoom + '%';
  }

  sliderChange = num => {
    const { minZoom, maxZoom, changeZoom } = this.props;
    changeZoom(num / 100 * (maxZoom - minZoom) + minZoom);
  }

  dropdownChange(ev) {
    const item = ev.item;
    const zoom = item.props.zoom;
    const { changeZoom } = this.props;
    changeZoom(Number(zoom));
  }

  render() {
    const { curZoom, minZoom, maxZoom } = this.props;
    const menu = (
      <Menu onClick={this.dropdownChange.bind(this)}>
        <Menu.Item zoom="0.5">50%</Menu.Item>
        <Menu.Item zoom="1">100%</Menu.Item>
        <Menu.Item zoom="1.5">150%</Menu.Item>
        <Menu.Item zoom="2">200%</Menu.Item>
      </Menu>
    );
    return (
      <div id="navigator">
        <div className="panel-title">导航器</div>
        <div id="minimap" ref={this.minimapRef} />
        <div id="zoom-slider">
          <Slider value={(curZoom - minZoom) / (maxZoom - minZoom) * 100}
            className="slider"
            tipFormatter = {this.sliderTipFormatter}
            onChange = {this.sliderChange}
          />
          <Dropdown overlay={menu} >
            <a className="zoom-dropdown-btn" href="#">
              {Math.ceil(curZoom * 100)} %<Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Navigator;

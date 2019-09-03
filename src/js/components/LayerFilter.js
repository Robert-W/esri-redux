
import React, { Component } from 'react';

export default class LayerFilter extends Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
    }
  displayName: 'LayerFilter';

  _handleChange(event) {
      const target = event.target;
      const checked = target.checked;
      const name = target.name;
      const eventInfo = {
          checked: checked,
          name: name
      };
      this.props.onClick(eventInfo);
  }

  render () {
      const {title, name} = this.props;
    return (
      <div className='filter'>
        <h3>{title}</h3>
        <label >
            <input type="checkbox"
                name={name}
                onChange={this._handleChange}

            />
            <span>{this.props.filterText}</span>
        </label>
      </div>
    );
  }
}

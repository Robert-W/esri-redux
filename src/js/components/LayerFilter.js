
import React, { Component } from 'react';

export default class LayerFilter extends Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
    }
  displayName: 'LayerFilter';

  _handleChange(event) {
      const target = event.target;
      this.props.onClick(target);
      console.log(target, 'the whole event');
  }

  render () {
      const {title} = this.props;
      console.log(title, 'the title');
      console.log(this.props, 'the props');
    return (
      <div className='filter'>
        <h3>{this.props.title}</h3>
        <label >
            <input type="checkbox"
                name="choiceOne"
                onChange={this._handleChange}

            />
            <span>{'Filter One'}</span>
        </label>
        <label>
            <input type="checkbox"
                name="choiceTwo"
                onChange={this._handleChange}
            />
            <span>{'Filter Two'}</span>
        </label>
      </div>
    );
  }
}

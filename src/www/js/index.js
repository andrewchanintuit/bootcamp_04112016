'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

function ChainedDropDown(props)  {

	const [ primaryItem, secondaryItem ] = props.value.split('|');

	const onSelectPrimary = (e) => {
		props.onChange({ target: {
			name: props.name,
			value: e.target.value + '|'
		}});
	};

	const onSelectSecondary = (e) => {
		props.onChange({ target: {
			name: props.name,
			value: primaryItem + '|' + e.target.value
		}});
	};

	const primaryItems = Object.keys(props.options);
	const secondaryItems = props.options[primaryItem] || [];

	return <span>

		<span><select name='primary-item' value={primaryItem} onChange={onSelectPrimary}>
			<option value='-1'>Select One...</option>
			{primaryItems.map(item => <option key={item} value={item}>{item}</option>)}
		</select></span>

	<span><select name='secondary-item' value={secondaryItem} onChange={onSelectSecondary}>
			<option value='-1'>Select One...</option>
			{secondaryItems.map(item => <option key={item} value={item}>{item}</option>)}
		</select></span>

	</span>;
}

class DemoForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			country: props.country,
			city: props.city
		};
		this._onChange = this._onChange.bind(this);
	}

	_onChange(e) {
		this.setState({
			'country': e.target.value.split('|')[0],
			'city': e.target.value.split('|')[1]
		});
	}

	render() {

		const options = {
			'United States': ['Washington, DC', 'New York City', 'Chicago', 'San Francisco'],
			'Canada': ['Ottawa','Montreal','Calgary','Edmonton'],
			'United Kingdom': ['London','Manchester','Suffolk','Belfast']
		};

		return <form>
			<div>
				<label>
					City: <ChainedDropDown name='city' value={this.state.country + '|' + this.state.city} onChange={this._onChange} options={options} />
					<div>Selected Country: {this.state.country}</div>
					<div>Selected City: {this.state.city}</div>
				</label>
			</div>
		</form>;
	}

}

ReactDOM.render(<DemoForm country='Canada' city='Montreal' />, document.querySelector('main'));

import React from 'react';
import {render} from 'react-dom';
// CSS
import './style/css/bootstrap.min.css';
import './index.css';
// JS
import {sampleText} from './sampleText';
// Library Marked
import marked from 'marked';

class App extends React.Component {

	state = {
		text: sampleText
	};

	// Juste avant que le rendu soit lancé
	componentWillMount() {
		var localText = localStorage.getItem('text');

		if(localText) {
			this.setState({text: localText});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text);
	}

	editText = (event) => {
		var text = event.target.value;
		this.setState({ text });
	};

	transformText = (text) => {
		var transformText = marked(text, {sanitize: true});
		return { __html: transformText};
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea className="form-control" rows="30"
						value={this.state.text} onChange={(e) => this.editText(e)}></textarea>
					</div>

					<div className="col-sm-6">
						<h1>Résultat</h1>
						<div dangerouslySetInnerHTML={this.transformText(this.state.text)} />
					</div>
				</div>
			</div>
		)
	}
}

render(
	<App />,
	document.getElementById('root')
);
var PHQ9 = React.createClass({
	/*stateProps:
		name: string,
		summary: string,
		questionsList: [question objects],
		scoresByQuestionId: {questionKey : answerScore},
		totalScore: number,
		answersList: [answerString],
		answersByPoints: {answerString : answerPoints},
		therapists: [therapist objects],
		severityMessage: string,
		submitted: boolean
	*/
	getInitialState: function() {
		return {
			name: 'Patient Health Questionnaire (PHQ-9)',
			summary: 'This easy to use patient questionnaire is a self-administered version of the PRIME-MD diagnostic instrument for common mental disorders. The PHQ-9 is the depression module, which scores each of the nine DSM-IV criteria as "0" (not at all) to "3" (nearly every day). It has been validated for use in primary care. It is not a screening tool for depression but it is used to monitor the severity of depression and response to treatment. However, it can be used to make a tentative diagnosis of depression in at-risk populations - eg, those with coronary heart disease or after stroke. When screening for depression the Patient Health Questionnaire (PHQ-2) can be used first (it has a 97% sensitivity and a 67% specificity). If this is positive, the PHQ-9 can then be used, which has 61% sensitivity and 94% specificity in adults.',
			questionsList: [
				{id: 1, text: 'Little interest or pleasure in doing things?'},
				{id: 2, text: 'Feeling down, depressed, or hopeless?'},
				{id: 3, text: 'Trouble falling or staying asleep, or sleeping too much?'},
				{id: 4, text: 'Feeling tired or having little energy?'},
				{id: 5, text: 'Poor appetite or overeating?'},
				{id: 6, text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?'},
				{id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television?'},
				{id: 8, text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?'},
				{id: 9, text: 'Thoughts that you would be better off dead, or of hurting yourself in some way?'}
			],
			scoresByQuestionId: {
				1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
				6: 0, 7: 0, 8: 0, 9: 0,
			},
			totalScore: 0,
			answersList: [
				'Not at all',
				'Several days',
				'More than half the days in the week',
				'Nearly every day',
			],
			answersByPoints: {
				'Not at all': 0,
				'Several days': 1,
				'More than half the days in the week': 2,
				'Nearly every day': 3
			},
			therapists: [],
			severityMessage: '',
			isMobile: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false, // just using to test if this is mobile by doing a check on iPhone/iPad/iPod - can be more accurate in future
			submitted: false
		}
	},

	updatePHQ9: function(e) {
		// updates the questionnaire after each user selection
		var questionId = e.id;
		var answer = e.answer;
		var points = this.state.answersByPoints[answer];
		var scoresByQuestionId = this.state.scoresByQuestionId;
		var pointDiff = points - scoresByQuestionId[questionId];
		scoresByQuestionId[questionId] = points;

		this.setState({ scoresByQuestionId: scoresByQuestionId });
		this.setState({ totalScore: this.state.totalScore + pointDiff });
	},

	submitPHQ9: function() {
		// submits the questionnaire, shows the depression level, and shows/hides therapists as needed
		var severity;
		var totalScore = this.state.totalScore;
		this.setState({
			submitted: true
		});
		switch(true) {
			case (totalScore <= 4):
				severity = 'none';
				this.hideTherapists();
				break;
			case (totalScore <= 9):
				severity = 'mild';
				this.hideTherapists();
				break;
			case (totalScore <= 14):
				severity = 'moderate';
				this.displayTherapists();
				break;
			case (totalScore <= 19):
				severity = 'moderately severe';
				this.displayTherapists();
				break;
			case (totalScore < 27):
				severity = 'severe';
				this.displayTherapists();
				break;
			default:
				alert('There is an error with the submission.');
		}
		if (severity) {
			this.setState({
				severityMessage: 'Your depression level is ' + severity + '.'
			});
		}
	},

	displayTherapists: function() {
		var therapists = this.retrieveTherapists(); // simulates grabbing 3 diff therapists based on information available (geo, prefs, etc.)
		this.setState({
			therapists: therapists
		});
	},

	hideTherapists: function() {
		this.setState({
			therapists: []
		});
	},

	retrieveTherapists: function() {
		return [
			{name: 'John Johnson', location: 'NYC', age: 30},
			{name: 'Steve Stevenson', location: 'Brooklyn', age: 40},
			{name: 'Will Williams', location: 'Queens', age: 50}
		]
	},

	render: function() {
		var questions = this.state.questionsList.map(function(question, i) {
			return <Question key={i} id={question.id} text={question.text} answers={this.state.answersList} updatePHQ9={this.updatePHQ9} />
		}.bind(this));
		return (
			<div className={this.state.isMobile ? 'mobile' : 'desktop'}>
				<h2>{this.state.name}</h2>
				<div className={this.state.isMobile ? 'hidden' : ''}>
					<div className="summary">{this.state.summary}</div>
				</div>
				<div className={this.state.isMobile && this.state.submitted ? 'hidden' : ''}>
					<table>
						<thead>
							<tr>
								<th>Question</th>
								<th>Answer</th>
							</tr>
						</thead>
						<tbody>
							{questions}
						</tbody>
					</table>
					<DepressionScore score={this.state.totalScore}/>
					<button onClick={this.submitPHQ9}> Submit </button>
				</div>
				<div className={this.state.severityMessage != '' ? '' : 'hidden'}>
					<div className="severity-message">{this.state.severityMessage}</div>
				</div>
				<TherapistContainer therapists={this.state.therapists} />
			</div>
		)
	}
});

var Question = React.createClass({
	propTypes: {
		id: React.PropTypes.number,
		text: React.PropTypes.string,
		answers: React.PropTypes.array
	},
	handleSelectAnswer: function(e) {
		var options = e.target.options;
		var numOptions = options.length;
		for (var i=0; i<numOptions; i++) {
			if (options[i].selected === true) {
				this.props.updatePHQ9({
					id: this.props.id,
					answer: options[i].value
				});
			}
		}
	},
	render: function() {
		var answers = this.props.answers.map(function(answer, i) {
			return <option key={i}>{answer}</option>
		});
		return (
			<tr>
				<td className="question">{this.props.text}</td>
				<td className="answer">
					<select onChange={this.handleSelectAnswer}>
						{answers}
					</select>
				</td>
			</tr>
		)
	}
});

var DepressionScore = React.createClass({
	propTypes: {
		score: React.PropTypes.number
	},
	getDefaultProps: function() {
		return {
			score: 0
		}
	},
	render: function() {
		return (
			<div className="score">
				Score: {this.props.score} / 27
			</div>
		)
	}
});

var TherapistContainer = React.createClass({
	propTypes: {
		therapists: React.PropTypes.array
	},
	getInitialState: function() {
		return {
			displayTherapists: false
		}
	},
	render: function() {
		this.state.displayTherapists = this.props.therapists.length > 0 ? true : false;
		var therapists = this.props.therapists.map(function(therapist, i) {
			return <div key={i}>Name: {therapist.name}, Age: {therapist.age}, Location: {therapist.location}</div>
		});
		return (
			<div className="therapist-container">
				<div className={this.state.displayTherapists ? '' : 'hidden'}>
					Suggested Therapists
					{therapists}
				</div>
			</div>
		)
	}
});

ReactDOM.render(<PHQ9 />, document.getElementById('app'));
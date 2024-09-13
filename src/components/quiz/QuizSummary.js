import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { addScore } from '../../services/operations/scoreAPI';

const handleAddScore = async (score) => {
    try {
        await addScore(score);
        // Optionally, refresh scores here.
    } catch (error) {
        console.error("Failed to add score:", error);
    }
};

const currentUser = JSON.parse(localStorage.getItem('current_user'));

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0,
        };
    }

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { state } = location;
            const calculatedScore = (state.score / state.numberOfQuestions) * 100;
            this.setState({
                score: calculatedScore,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
            });
            const scoreData = { score: calculatedScore, username: currentUser.username };
            handleAddScore(scoreData);
        }
    }

    render() {
        const { location } = this.props;
        const state = location ? location.state || {} : {};
        let stats, remark;
        const userScore = this.state.score;

        if (userScore <= 30) {
            remark = 'You need more practice!';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if (userScore > 50 && userScore <= 70) {
            remark = 'You can do better!';
        } else if (userScore > 70 && userScore <= 84) {
            remark = 'You did great!';
        } else {
            remark = 'You\'re an absolute genius!';
        }

        if (Object.keys(state).length > 0) {
            stats = (
                <Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />
                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />
                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswers}</span><br />
                        <span className="stat left">Number of Wrong Answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span><br />
                        <span className="stat left">Hints Used: </span>
                        <span className="right">{this.state.hintsUsed}</span><br />
                        <span className="stat left">50-50 Used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span>
                    </div>
                    <section>
                        <ul>
                            <li><Link to="/play/quiz">Play Again</Link></li>
                            <li><Link to="/quiz">Back to Home</Link></li>
                        </ul>
                    </section>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li><Link to="/play/quiz">Take a Quiz</Link></li>
                        <li><Link to="/quiz">Back to Home</Link></li>
                    </ul>
                </section>
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary;

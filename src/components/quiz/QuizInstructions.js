import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import answerImage from '../../assets/img/answer.png';
import fiftyFiftyImage from '../../assets/img/fiftyFifty.PNG';
import hintsImage from '../../assets/img/hints.PNG';
import optionsImage from '../../assets/img/options.PNG';

const QuizInstructions = () => (
  <Fragment>
    <Helmet>
      <title>Quiz Instructions - Quiz App</title>
    </Helmet>
    <div className="instructions container">
      <h1>Game Instructions</h1>
      <p>Kindly read through the instructions thoroughly.</p>
      <ul className="browser-default" id="main-list">
        <li>The game lasts for 15 minutes and will automatically end when the time elapses.</li>
        <li>There are 15 questions in each game session.</li>
        <li>
          Each question comes with 4 options.
          <img src={optionsImage} alt="Options example for Quiz App" />
        </li>
        <li>
          Choose the option that you believe answers the question by clicking or selecting it.
          <img src={answerImage} alt="Answer example for Quiz App" />
        </li>
        <li>
          You have 2 lifelines available during the game:
          <ul id="sublist">
            <li>Two 50-50 chances</li>
            <li>Five Hints</li>
          </ul>
        </li>
        <li>
          When you use a 50-50 lifeline by clicking the icon <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>, it will eliminate two incorrect options, leaving one correct and one incorrect option.
          <img src={fiftyFiftyImage} alt="Fifty-Fifty example for Quiz App" />
        </li>
        <li>
          Using a hint by clicking the icon <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span> will remove one incorrect option, leaving two incorrect options and one correct option. Multiple hints can be used on a single question.
          <img src={hintsImage} alt="Hints example for Quiz App" />
        </li>
        <li>You can quit the game at any time. Your score will be displayed afterward.</li>
        <li>The timer begins as soon as the game starts.</li>
        <li>If you feel prepared, let's start!</li>
      </ul>
      <div>
        <span className="left">
          <Link to="/quiz">No, take me back</Link>
        </span>
        <span className="right">
          <Link to="/play/quiz">Okay, Let's do this!</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;

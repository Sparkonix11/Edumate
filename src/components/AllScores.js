import { useState, useEffect } from 'react';
import { fetchAllScores } from '../services/operations/scoreAPI';
import Navbar from './Navbar';
import "../styles/allScores.css"


const AllScores = () => {
    const [allScores, setAllScores] = useState([]);

    const getAllScoresHandler = async () => {
    try {
        const response = await fetchAllScores();
        setAllScores(response.responseData.scores);
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
    };

    useEffect(() => {
    getAllScoresHandler();
    }, []); // Run once when the component mounts
    return(
        <>
        <Navbar />
        <div className="score-container">
            <h3>All Scores</h3>
            <ul>
            <li className="score">
                <div><strong>Username</strong></div>
                <div><strong>Score</strong></div>
                <div><strong>Date</strong></div>
                <div><strong>Time</strong></div>

            </li>
            {allScores.map((score, index) => {
                const date = new Date(score.date.$date);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                let hours = date.getHours();
                const amPm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12; 
                const formattedTime = `${hours}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} ${amPm}`;
                return (
                    <li className="score" key={index}>
                        <div>{score.username}</div>
                        <div>{score.score}</div>
                        <div>{formattedDate}</div>
                        <div>{formattedTime}</div>
                    </li>
                );
            })}
            </ul>
        </div>
        </>
    )
};

export default AllScores
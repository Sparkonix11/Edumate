import React, { useState, useEffect } from "react";
import { fetchUserScores } from "../services/operations/scoreAPI";
import Navbar from "./Navbar";


const MyScore = () => {
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    const [allScores, setAllScores] = useState([]);

    const username = JSON.parse(localStorage.getItem('current_user')).username
    const getAllScoresHandler = async () => {
        try {
        const response = await fetchUserScores(username);

        setAllScores(response.responseData.scores);
        } catch (error) {
        console.error("Error fetching scores:", error);
        }
    };

    useEffect(() => {
        getAllScoresHandler();
    }, []); // Run once when the component mounts

    return(
        <>{current_user.role === 'student' && <div>
        <Navbar />
            <div className="score-container">
                { allScores.length === 0 &&
                    <h4 style={{color: 'white'}}>You have not taken any Quiz yet</h4>

                }
                { allScores.length !== 0 && <>
                <h3>My Scores</h3>
                <ul>
                <li className="score">
                    <div><strong style={{fontWeight:"600"}}>Score</strong></div>
                    <div><strong style={{fontWeight:"600"}}> Date</strong></div>
                    <div><strong style={{fontWeight:"600"}}>Time</strong></div>
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
                            <div>{score.score}</div>
                            <div>{formattedDate}</div>
                            <div>{formattedTime}</div>
                        </li>
                    );
                })}
                </ul></>}
            </div>
        </div>}
        </>
    )
};

export default MyScore
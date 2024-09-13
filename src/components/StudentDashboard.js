import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from 'react';
import path from "path-browserify";
import "../styles/student_dashboard.css"

const StudentDashboard = () => {

    const tableData = [
        ["Mathematics", "MATH1", "Saturday", "2:30", "4:30", "Room 1"],
        ["Physics", "PHY1", "Monday", "10:00", "12:00", "Room 2"],
        ["Chemistry", "CHEM1", "Wednesday", "14:00", "16:00", "Room 3"],
        ["Biology", "BIO1", "Friday", "9:00", "11:00", "Room 4"]
    ];


    // const [tableData, setTableData] = useState([
    //     ["Mathematics", "MATH1", "Saturday", "2:30", "4:30", "Room 1"],
    //     ["Physics", "PHY1", "Monday", "10:00", "12:00", "Room 2"],
    //     ["Chemistry", "CHEM1", "Wednesday", "14:00", "16:00", "Room 3"],
    //     ["Biology", "BIO1", "Friday", "9:00", "11:00", "Room 4"]
    // ]);


    // const cursorPosition = useRef(null);
    // const timerId = useRef(null);

    // useEffect(() => {
    //     // Clear the timer on component unmount
    //     return () => {
    //         clearTimeout(timerId.current);
    //     };
    // }, []);

    // const handleCellChange = (rowIndex, cellIndex, newValue) => {
    //     // Clear previous timer
    //     clearTimeout(timerId.current);

    //     // Set a new timer to update cell content
    //     timerId.current = setTimeout(() => {
    //         const updatedTableData = [...tableData];
    //         updatedTableData[rowIndex][cellIndex] = newValue;
    //         setTableData(updatedTableData);

    //         // Store current selection range
    //         const selection = window.getSelection();
    //         if (selection.rangeCount > 0) {
    //             cursorPosition.current = selection.getRangeAt(0);
    //         }
    //     }, 2000); // Adjust the delay as needed
    // };

    // useEffect(() => {
    //     if (cursorPosition.current) {
    //         // Restore cursor position after re-render
    //         const selection = window.getSelection();
    //         selection.removeAllRanges();
    //         selection.addRange(cursorPosition.current);
    //     }
    // });
    
    
    return (
        <div>
            <Navbar />
            <div className="tt-container">
                <h4>Timetable</h4>
                {/* <img src={timetable} alt=""/> */}
                <table>
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Class Code</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                            // <td key={`${rowIndex}-${cellIndex}`} contentEditable onInput={(e) => handleCellChange(rowIndex, cellIndex, e.target.innerText)}>
                            //     {cell}
                            // </td>
                            <td key={`${rowIndex}-${cellIndex}`}>
                            {cell}
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;
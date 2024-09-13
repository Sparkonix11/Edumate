import { useState, useEffect, useRef } from 'react';
import Navbar from "./Navbar"
import '../styles/dashboard.css'
import { editQuestion } from '../services/operations/questionAPI';
import { deleteQuestion } from '../services/operations/questionAPI';
import { addQuestion } from '../services/operations/questionAPI';

const TeacherDashboard = () => {
    const current_user = JSON.parse(localStorage.getItem('current_user'))

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(storedQuestions);
    
        const handleStorageChange = () => {
            const updatedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
            setQuestions(updatedQuestions);
        };
    
        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
    
        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    

    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const [editQuestionData, setQuestionData] = useState({
        id:"",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "" // Add answer field to the editQuestionData state
    });
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    

    const formRef = useRef(null);

    const onClose = () => {
        setShowEditQuestion(false);
        // Define the onClose function if needed
    }

    const handleEditClick = (question) => {
        setShowEditQuestion(true);
        setQuestionData({
            id: question._id.$oid, 
            question: question.question, // Make sure question text is set correctly
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            answer: question.answer
        });
    };
    

    const handleEditSubmit = async (event, questionId) => {
        event.preventDefault();
        try {
            const formData = {
                question: editQuestionData.question,
                optionA: editQuestionData.optionA,
                optionB: editQuestionData.optionB,
                optionC: editQuestionData.optionC,
                optionD: editQuestionData.optionD,
                answer: editQuestionData.answer
            };
    
            const response = await editQuestion(formData, questionId);
            const { success, message } = response;
            if (success) {
                setResponseMessage(message);
                onClose();
                window.location.reload()

            } else {
                setError(message);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('');
            setError(error.response.data.message);
        }
    };
    


    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [addQuestionData, setAddQuestionData] = useState({
        id:"",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "" // Add answer field to the editQuestionData state
    });

    
    const onAddPopupClose = () => {
        setShowAddQuestion(false);
        // Define the onClose function if needed
    }

    const handleAddClick = () => {
        setShowAddQuestion(true);
    };
    

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                question: addQuestionData.question,
                optionA: addQuestionData.optionA,
                optionB: addQuestionData.optionB,
                optionC: addQuestionData.optionC,
                optionD: addQuestionData.optionD,
                answer: addQuestionData.answer
            };
    
            const response = await addQuestion(formData);
            const { success, message } = response;
            if (success) {
                setResponseMessage(message);
                onAddPopupClose();
                window.location.reload()

            } else {
                setError(message);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('');
            setError(error.response.data.message);
        }
    };



    const handleDeleteSubmit = async (questionId) => {
        try {

    
            const response = await deleteQuestion(questionId);
            const { success, message } = response;
            if (success) {
                console.log(message)
                window.location.reload()
            } else {
                console.log('error while Deleting question')
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('');
            setError(error.response.data.message);
        }
    };

    return(
        <>
        {current_user.role === 'teacher' && 
        <div>
            <Navbar />

            <div className="teacher-dashboard-questions">
                <center><h3>Questions</h3></center>
                <ul className="question-list">
                    {questions.map(question => (
                        <li key={question._id.$oid} className="question-item">
                            <div className="question-details">{question.question}</div>
                            <div className="option-details"><strong>Option A:</strong> {question.optionA}</div>
                            <div className="option-details"><strong>Option B:</strong> {question.optionB}</div>
                            <div className="option-details"><strong>Option C:</strong> {question.optionC}</div>
                            <div className="option-details"><strong>Option D:</strong> {question.optionD}</div>
                            <div className="answer-details"><strong>Answer:</strong> {question.answer}</div>
                            <div className="button-container">
                                <button onClick={() => handleEditClick(question)}>Edit</button>
                                <button onClick={() => handleDeleteSubmit(question._id.$oid)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <center><button onClick={() => handleAddClick()}>Add Question</button></center>
            </div>

            {showEditQuestion && <div className="popup-window">
                <div className="contain">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h4>Edit Question</h4>
                    <form onSubmit={(event) => handleEditSubmit(event, editQuestionData.id)} ref={formRef}>
                        Question
                        <input
                            type="text"
                            value={editQuestionData.question}
                            onChange={(e) => setQuestionData({ ...editQuestionData, question: e.target.value })}
                            id="edit_question"
                            placeholder="Enter your Question"
                            name="question"
                        />
                        Option-1
                        <input
                            type="text"
                            value={editQuestionData.optionA}
                            onChange={(e) => setQuestionData({ ...editQuestionData, optionA: e.target.value })}
                            id="edit_optionA"
                            placeholder="Enter your 1st Option"
                            name="optionA"
                        />
                        Option-2
                        <input
                            type="text"
                            value={editQuestionData.optionB}
                            onChange={(e) => setQuestionData({ ...editQuestionData, optionB: e.target.value })}
                            id="edit_optionB"
                            placeholder="Enter your 2nd Option"
                            name="optionB"
                        />
                        Option-3
                        <input
                            type="text"
                            value={editQuestionData.optionC}
                            onChange={(e) => setQuestionData({ ...editQuestionData, optionC: e.target.value })}
                            id="edit_optionC"
                            placeholder="Enter your 3rd Option"
                            name="optionC"
                        />
                        Option-4
                        <input
                            type="text"
                            value={editQuestionData.optionD}
                            onChange={(e) => setQuestionData({ ...editQuestionData, optionD: e.target.value })}
                            id="edit_optionD"
                            placeholder="Enter your 4th Option"
                            name="optionD"
                        />
                        <label htmlFor="edit_answer">Correct Answer</label>
                        <select
                            id="edit_answer"
                            name="answer"
                            style={{display:'block'}}
                            value={editQuestionData.answer}
                            onChange={(e) => setQuestionData({ ...editQuestionData, answer: e.target.value })}
                        >
                            <option value="" disabled>Select Correct Answer</option>
                            <option value={editQuestionData.optionA}>Option A</option>
                            <option value={editQuestionData.optionB}>Option B</option>
                            <option value={editQuestionData.optionC}>Option C</option>
                            <option value={editQuestionData.optionD}>Option D</option>
                        </select>
                        <br /><br />
                        <div className="button-group">
                            <button type="submit">Submit Changes</button>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
                </div>
            </div> }



            {showAddQuestion && <div className="popup-window">
                <div className="contain">
                    <button className="close-button" onClick={onAddPopupClose}>X</button>
                    <h4>Add Question</h4>
                    <form onSubmit={(event) => handleAddSubmit(event)}>
                        Question
                        <input
                            type="text"
                            value={addQuestionData.question}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, question: e.target.value })}
                            id="add_question"
                            placeholder="Enter your Question"
                            name="question"
                        />
                        Option-1
                        <input
                            type="text"
                            value={addQuestionData.optionA}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, optionA: e.target.value })}
                            id="add_optionA"
                            placeholder="Enter your 1st Option"
                            name="optionA"
                        />
                        Option-2
                        <input
                            type="text"
                            value={addQuestionData.optionB}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, optionB: e.target.value })}
                            id="add_optionB"
                            placeholder="Enter your 2nd Option"
                            name="optionB"
                        />
                        Option-3
                        <input
                            type="text"
                            value={addQuestionData.optionC}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, optionC: e.target.value })}
                            id="add_optionC"
                            placeholder="Enter your 3rd Option"
                            name="optionC"
                        />
                        Option-4
                        <input
                            type="text"
                            value={addQuestionData.optionD}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, optionD: e.target.value })}
                            id="add_optionD"
                            placeholder="Enter your 4th Option"
                            name="optionD"
                        />
                        <label htmlFor="edit_answer">Correct Answer</label>
                        <select
                            id="add_answer"
                            name="answer"
                            style={{display:'block'}}
                            value={addQuestionData.answer}
                            onChange={(e) => setAddQuestionData({ ...addQuestionData, answer: e.target.value })}
                        >
                            <option value="" disabled>Select Correct Answer</option>
                            <option value={addQuestionData.optionA}>Option A</option>
                            <option value={addQuestionData.optionB}>Option B</option>
                            <option value={addQuestionData.optionC}>Option C</option>
                            <option value={addQuestionData.optionD}>Option D</option>
                        </select>
                        <br /><br />
                        <div className="button-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
                </div>
            </div> }
        </div>}
        </>
    )
}

export default TeacherDashboard

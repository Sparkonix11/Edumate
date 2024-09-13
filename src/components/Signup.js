import { Fragment, useState } from "react";
import { Helmet } from 'react-helmet';
import { signup } from "../services/operations/authAPI";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css'
// import { Link } from 'react-router-dom';
function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  
    const handleSignUp = async (e) => {
      e.preventDefault();
      
      // Validation
      if (!name || !username || !email || !password || !confirm_password || !role) {
        setError('All fields are required');
        return;
      }
      if (password !== confirm_password) {
        setError('Passwords do not match');
        return;
      }
  
      // Call signup function with form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirm_password', confirm_password);
      formData.append('role', role);
      const { success, message } = await signup(formData);
  
      if (success) {
        console.log('Signup successful:', message);
        const current_user = JSON.parse(localStorage.getItem('current_user'))
        if (current_user.role === 'teacher'){
            navigate('/dashboard');    
          }
          else {
            navigate('/home')
          }     // Handle successful signup, e.g., redirect to dashboard
      } else {
        console.error('Signup failed:', message);
        setError(message);
      }
    };
  
    return (
      <Fragment>
         <Helmet>
            <title>Instatute</title>
        </Helmet>
        <h4>Welcome to Instatute Signup</h4>  
        <div className="content">
          <form onSubmit={handleSignUp}>
            <div>
              <label htmlFor="name"><b>Name</b></label>
              <input type="text" placeholder="Enter your Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
  
            <div>
              <label htmlFor="username"><b>Username</b></label>
              <input type="text" placeholder="Enter your Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
  
            <div>
              <label htmlFor="email"><b>Email</b></label>
              <input type="email" placeholder="Enter your Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
  
            <div>
              <label htmlFor="password"><b>Password</b></label>
              <input type="password" placeholder="Enter your Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
  
            <div>
              <label htmlFor="confirm_password"><b>Confirm Password</b></label>
              <input type="password" placeholder="Confirm your Password" name="confirm_password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
  
            <div>
              <label><b>User type</b></label><br />
              <label>
                <input className="with-gap" name="role" type="radio" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} required />
                <span>Student</span>
              </label>
              <br />
              <label>
                <input className="with-gap" name="role" type="radio" value="teacher" checked={role === "teacher"} onChange={(e) => setRole(e.target.value)} required />
                <span>Teacher</span>
              </label>
            </div>
  
            <button type="submit">Register</button>
          </form>
        </div>
        <Link to={'/login'}><a>Already have an account? Login</a></Link><br/>
      </Fragment>
    );
  }
  
  export default SignUp;
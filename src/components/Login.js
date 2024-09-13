import { Fragment, useState } from "react";
import { Helmet } from 'react-helmet';
import { login } from "../services/operations/authAPI";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!username || !password ) {
          setError('All fields are required');
          return;
        }
    
        // Call signup function with form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const { success, message } = await login(formData);
    
        if (success) {
          console.log('Login successful:', message);
          const current_user = JSON.parse(localStorage.getItem('current_user'))
          if (current_user.role === 'teacher'){
            navigate('/teacherdashboard');    
          }
          else {
            navigate('/dashboard')
          }
                // Handle successful signup, e.g., redirect to dashboard
        } else {
          console.error('Signup failed:', message);
          setError(message);
        }
      };
    
    return(
        <Fragment>
         <Helmet>
            <title>Instatute</title>
        </Helmet>
        <h4>Login</h4>  
        <div className="content">
          <form onSubmit={handleLogin}>
    
  
            <div>
              <label htmlFor="username"><b>Username</b></label>
              <input type="text" placeholder="Enter your Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="password"><b>Password</b></label>
              <input type="password" placeholder="Enter your Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
  
            <button type="submit">Login</button>
          </form>
        </div>
        <Link to={'/signup'}><a>Don't have an Instatute account? Signup here</a></Link><br/>
      </Fragment>
    )
}

export default Login
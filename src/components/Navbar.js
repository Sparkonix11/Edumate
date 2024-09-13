import { logout } from '../services/operations/authAPI'
import '../styles/navbar.css'
import Logo from '../assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const current_user = JSON.parse(localStorage.getItem('current_user'))

    const handleLogout = async() => {
        try {
            const { success } = await logout()
            if (success) {
                console.log('Logout Successful')
                navigate('/login')
            } else {
                console.error('Logout failed.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return(
        <div className="nav-container">
            <div className="logo">
                <img src={Logo} alt='' />
            </div>

            <div className="nav-links">
                <ul>
                    {current_user !== null && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                            <div>{current_user.name}</div>
                            {current_user.role === 'teacher' && (
                                <>
                                    <li className={location.pathname === '/teacherdashboard' ? 'active' : ''}>
                                        <div onClick={() => navigate('/teacherdashboard')}>Dashboard</div>
                                    </li>
                                    <li className={location.pathname === '/allscores' ? 'active' : ''}>
                                        <div onClick={() => navigate('/allscores')}>Scores</div>
                                    </li>
                                </>
                            )}

                            {current_user.role === 'student' && (
                                <>
                                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                                        <div onClick={() => navigate('/dashboard')}>Dashboard</div>
                                    </li>
                                    <li className={location.pathname === '/myscores' ? 'active' : ''}>
                                        <div onClick={() => navigate('/myscores')}>My Scores</div>
                                    </li>

                                    <li className={location.pathname === '/quiz' ? 'active' : ''}>
                                        <div onClick={() => navigate('/quiz')}>Quiz</div>
                                    </li>
                                </>
                            )}

                            <li><div onClick={handleLogout} style={{ color: 'white', margin: 0 }}>Logout</div></li>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar

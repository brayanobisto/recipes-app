import { Link } from 'react-router-dom'
import styles from './index.module.css'

function LandingPage () {
  return (
    <div className={styles['landing-page']}>
      <div>
        <h1>Welcome to Recipes App 🍲</h1>
        <p>Create recipes, search by name, filter by diet type, sort by name or health level</p>
      </div>

      <Link to='/home'>Get Started</Link>
    </div>
  )
}

export default LandingPage

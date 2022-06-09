import { Link } from 'react-router-dom'
import styles from './index.module.css'

function RecipeCard ({ id, name, image, healthScore, diets }) {
  return (
    <Link className={styles['recipe-card']} to={`recipes/${id}`}>
      <img
        src={image}
        alt={name}
        onError={(event) => event.target.setAttribute('src', 'https://spoonacular.com/recipeImages/157086-312x231.jpg')}
      />
      <div className={styles['recipe-info']}>
        <h2>{name}</h2>
        <p>Health Score: {healthScore}</p>
        {diets.length > 0 && (
          <ul>
            {diets.map((diet) => (
              <li key={diet + Date.now()}>{diet}</li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}

export default RecipeCard

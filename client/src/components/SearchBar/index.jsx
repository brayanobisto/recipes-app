import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchRecipesAction } from '../../redux/actions'
import styles from './index.module.css'

function SearchBar () {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleSubmit = (evt) => {
    if (name === '') return
    evt.preventDefault()
    dispatch(searchRecipesAction(name))
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type='text'
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        placeholder='Pasta With Tuna'
      />
      <button className={styles.button} type='submit'>
        Search
      </button>
    </form>
  )
}

export default SearchBar

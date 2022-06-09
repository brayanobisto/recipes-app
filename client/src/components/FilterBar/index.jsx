import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction, setSortAction } from '../../redux/actions'
import styles from './index.module.css'

function FilterBar () {
  const [loading, setLoading] = useState(true)
  const diets = useSelector((state) => state.diets)
  const recipes = useSelector((state) => state.recipes)
  const filter = useSelector((state) => state.filter)
  const sort = useSelector((state) => state.sort)
  const dispatch = useDispatch()

  useEffect(() => {
    if (diets.message || diets.length) setLoading(false)
  }, [diets])

  if (loading) return <p>Loading...</p>
  // if (diets.message) return <p>{diets.message}</p>;

  return (
    <>
      <div>
        <label className={styles.label} htmlFor='diets'>
          Filter by diet:
        </label>
        <select
          disabled={recipes.message}
          className={styles.select}
          name='diets'
          id='diets'
          value={filter}
          onChange={(evt) => dispatch(setFilterAction(evt.target.value))}
        >
          <option className={styles.option} value='any'>
            any
          </option>
          {diets.map(({ id, name }) => (
            <option
              className={styles.option}
              key={id + name + Date.now().toString()}
              value={name}
            >
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* ORDENAMIENTO */}
      <div>
        <label className={styles.label} htmlFor='field'>
          Sort by:
        </label>
        <select
          disabled={recipes.message}
          className={styles.select}
          name='field'
          id='field'
          value={sort.field}
          onChange={(evt) =>
            evt.target.value === 'none'
              ? dispatch(setSortAction(evt.target.value, evt.target.value))
              : dispatch(setSortAction(evt.target.value, sort.type))}
        >
          <option className={styles.option} value='none'>
            none
          </option>
          <option className={styles.option} value='name'>
            name
          </option>
          <option className={styles.option} value='healthScore'>
            health score
          </option>
        </select>
      </div>

      {sort.field !== 'none' && (
        <div>
          <label className={styles.label} htmlFor='direction'>
            Direction
          </label>
          <select
            disabled={recipes.message}
            className={styles.select}
            name='direction'
            id='direction'
            value={sort.type}
            onChange={(evt) => dispatch(setSortAction(sort.field, evt.target.value))}
          >
            <option className={styles.option} value='none'>
              none
            </option>
            <option className={styles.option} value='asc'>
              {sort.field === 'name' ? 'a - z' : 'least healthy'}
            </option>
            <option className={styles.option} value='desc'>
              {sort.field === 'name' ? 'z - a' : 'healthiest'}
            </option>
          </select>
        </div>
      )}
    </>
  )
}

export default FilterBar

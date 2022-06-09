import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipeAction/* , resetResponseAction */ } from '../../redux/actions'
import styles from './index.module.css'

import MultiSelect from '../../components/MultiSelect'
import Spinner from '../../components/Spinner'

function CreateRecipePage () {
  const diets = useSelector((state) => state.diets)
  const loading = useSelector((state) => state.loading)
  // const response = useSelector((state) => state.response)
  const [creating, setCreating] = useState(false)
  const recipe = useSelector((state) => state.recipe)
  const dispatch = useDispatch()

  // const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    summary: '',
    image: '',
    score: '0',
    healthScore: '0',
    instructions: '',
    diets: []
  })

  useEffect(() => {
    setCreating(false)
  }, [recipe])//eslint-disable-line

  const validate = () => {
    setErrors({})
    const errors = {}

    // validate name field is not empty
    if (form.name.trim() === '') {
      errors.name = 'Name is required'
    }

    // validate summary field is not empty
    if (form.summary.trim() === '') {
      errors.summary = 'Summary is required'
    }

    // validate score field must be a number and is between 0 and 100
    if (isNaN(form.score)) {
      errors.score = 'Score must be a number'
    } else if (form.score < 0 || form.score > 100) {
      errors.score = 'Score must be between 0 and 100'
    }

    // validate healthScore field must be a number and is between 0 and 100
    if (isNaN(form.healthScore)) {
      errors.healthScore = 'Health Score must be a number'
    } else if (form.healthScore < 0 || form.healthScore > 100) {
      errors.healthScore = 'Health Score must be between 0 and 100'
    }

    // validate diets almost have an element selected
    if (form.diets.length === 0) {
      errors.diets = 'At least one diet must be selected'
    }

    setErrors(errors)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    if (Object.keys(errors).length === 0) {
      const formatedForm = {
        name: form.name.trim(),
        summary: form.summary.trim(),
        score: Number(form.score),
        healthScore: Number(form.healthScore),
        instructions: form.instructions.trim(),
        diets: form.diets.map((diet) => diet.id)
      }

      if (form.image.trim() !== '') {
        formatedForm.image = form.image
      }

      dispatch(createRecipeAction(formatedForm))
      setCreating(true)
      setForm({
        name: '',
        summary: '',
        image: '',
        score: '0',
        healthScore: '0',
        instructions: '',
        diets: []
      })
    } else {
      alert('Please fix the errors before submitting')
    }
  }

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    })
  }

  useEffect(() => {
    validate()
  }, [form]); //eslint-disable-line

  // useEffect(() => {
  //   if (diets.message || diets.length) setLoading(false)
  // }, [diets])

  if (loading) return <Spinner />
  if (diets.message) return <p>{diets.message}</p>

  return (
    <div className={styles['create-container']}>
      <h1 className={styles.title}>Create a new recipe</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor='name'>Name</label>
          <input
            className={errors.name ? styles['input-error'] : styles.input}
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            autoComplete='off'
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor='summary'>Summary</label>
          <textarea
            className={errors.summary ? styles['textarea-error'] : styles.textarea}
            name='summary'
            value={form.summary}
            onChange={handleChange}
          />
          {errors.summary && <span>{errors.summary}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor='image'>URL Image</label>
          <input
            className={styles.input}
            type='text'
            name='image'
            value={form.image}
            onChange={handleChange}
            autoComplete='off'
          />
          {errors.image && <span>{errors.image}</span>}
        </div>

        <div className={styles['form-group-score']}>
          <label htmlFor='score'>Score</label>
          <input
            className={styles.range}
            type='range'
            step={1}
            min={0}
            max={100}
            value={form.score}
            name='score'
            onChange={handleChange}
          />
          <label>{form.score}</label>
          {errors.score && <p>{errors.score}</p>}
        </div>

        <div className={styles['form-group-score']}>
          <label htmlFor='healthScore'>Health Score</label>
          <input
            className={styles.range}
            type='range'
            step={1}
            min={0}
            max={100}
            value={form.healthScore}
            name='healthScore'
            onChange={handleChange}
          />
          <label>{form.healthScore}</label>
          {errors.healthScore && <span>{errors.healthScore}</span>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor='instructions'>Instructions</label>
          <textarea
            className={styles.textarea}
            name='instructions'
            value={form.instructions}
            onChange={handleChange}
          />
          {errors.instructions && <p>{errors.instructions}</p>}
        </div>

        <MultiSelect diets={diets} form={form} setForm={setForm} errors={errors} />

        <div>
          <button className={styles.button} type='submit' disabled={Object.keys(errors).length > 0 || creating}>
            Create recipe

          </button>
        </div>
        {creating && <Spinner />}
        {recipe.message !== undefined && <p className={styles.message}>{recipe.message}</p>}
      </form>
    </div>
  )
}

export default CreateRecipePage

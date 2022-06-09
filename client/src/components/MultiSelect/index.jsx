import { useEffect, useState } from 'react';
import styles from './index.module.css';

function MultiSelect({ diets, form, setForm, errors }) {
  const [options, setOptions] = useState(diets);

  useEffect(() => {
    if (form.diets.length === 0) {
      setOptions(diets);
    }
  }, [form.diets]); //eslint-disable-line

  const handleClick = (evt) => {
    const { id, name } = evt.target.dataset;
    const newOptions = options.concat({ id: Number(id), name });
    const newDiets = form.diets.filter((diet) => diet.name !== name);

    setOptions(newOptions);
    setForm({
      ...form,
      diets: newDiets,
    });
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    const diet = diets.filter((diet) => diet.id === Number(value));
    const newOptions = options.filter((diet) => diet.id !== Number(value));

    setOptions(newOptions);
    setForm({
      ...form,
      diets: form.diets.concat(diet),
    });
  };

  return (
    <div className={styles['multiselect-container']}>
      <label htmlFor='diets'>Diets</label>

      <ul className={styles['diets-list']}>
        {form.diets.map(({ id, name }) => (
          <li className={styles.diet} key={id + name + Date.now().toString()} data-id={id} data-name={name} onClick={handleClick}>
            {name}
            <span className={styles['delete-button']} data-id={id} data-name={name} onClick={handleClick}>
              x
            </span>
          </li>
        ))}
      </ul>

      {options.length > 0 && (
        <select className={styles.select} name='diets' onChange={handleChange}>
          <option className={styles.option} value=''>
            Select a diet
          </option>
          {options.map(({ id, name }) => (
            <option className={styles.option} key={id + name + Date.now().toString()} value={id}>
              {name}
            </option>
          ))}
        </select>
      )}
      {errors.diets && <span>{errors.diets}</span>}
    </div>
  );
}

export default MultiSelect;

import styles from './index.module.css';

function Paginator({ currentPage, recipesPerPage, totalRecipes, paginate }) {
  const pages = Array.from(Array(Math.ceil(totalRecipes / recipesPerPage)).keys(), (_, x) => x + 1);

  return (
    <div className={styles['paginator-container']}>
      <div className={styles['pages-container']}>
        {pages.map((page, index) => (
          <span
            onClick={() => paginate(page)}
            key={page + Date.now().toString() + index}
            className={currentPage === page ? styles['active-page'] : styles.page}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Paginator;

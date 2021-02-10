import React from 'react'

import styles from './spinner.module.css'

const Spinner = (): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.loader} />
  </div>
)

export default Spinner

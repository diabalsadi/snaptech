import cx from 'classnames'
import styles from './Button.module.scss'

const Button = ({ displayName, onClick, className }) => {
  return (
    <button onClick={onClick} className={cx(styles.button, className)}>
      {displayName}
    </button>
  )
}

export default Button

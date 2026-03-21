import { useStore } from '../../state/useStore'
import styles from './index.module.css'

export const BalanceDisplay = () => {
  const balance = useStore((state) => state.balance)

  return <div className={styles.balance}>Balance: {balance}</div>
}

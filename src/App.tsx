import { Controls } from "./components/Controls";
import styles from "./App.module.css";
import { BalanceDisplay } from "./components/BalanceDisplay";

function App() {
  return (
    <main className={styles.main}>
      <BalanceDisplay />
      <Controls />
    </main>
  );
}

export default App;

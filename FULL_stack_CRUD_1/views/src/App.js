import styles from "./App.module.css";
import Routing from "./routes";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.main}>
        <Routing />
      </div>
    </div>
  );
}

export default App;

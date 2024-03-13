/**
 * Presumably, there will be more things in this application than a form,
 * so I'm creating the Form as a stand-alone component and leaving the
 * main App file alone, so Form can be plugged in somewhere else in a
 * real application
 */
import NameLocationForm from './components/NameLocationForm';
import classes from './App.module.css';

function App() {
  return (
    <main className={classes['main']}>
      <NameLocationForm />
    </main>
  );
}

export default App;

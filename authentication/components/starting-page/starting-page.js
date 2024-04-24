import Loader from '../ui/loader';
import classes from './starting-page.module.css';

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board...!</h1>
      {/* <Loader/> */}
    </section>
  );
}

export default StartingPageContent;

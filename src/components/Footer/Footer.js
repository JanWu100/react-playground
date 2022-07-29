import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.bottomBar}>
        <a href="#" className={classes.link}>
          facebook
        </a>
        <a href="#" className={classes.link}>
          instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;

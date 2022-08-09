import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.bottomBar}>
        <a className={classes.link} href="https://github.com/JanWu100/react-playground" target="blank">github</a>
      </div>
    </footer>
  );
};

export default Footer;

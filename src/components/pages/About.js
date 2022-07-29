import classes from "./About.module.css";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: .2 }}
        className={classes.aboutContainer}
      >
        <h4 className={classes.headerText}>Studio</h4>
        <p className={classes.bodyText}>
          Lorem ipsum senectus quam tempor pharetra
          tincidunt. Urna, venenatis netus lacus, odio. Turpis lorem quis ut in.
          Tincidunt aliquam vitae, fermentum quis nibh dignissim. Commodo amet
          phasellus urna cursus fermentum. Id purus quam viverra tempus nec
          bibendum amet. Natoque neque eget platea in tempus. Nunc rhoncus
          aliquet pellentesque quis vitae ornare justo hac. Gravida integer eget
          purus risus eget.
          <br />
          <br />
          Quisque pellentesque proin vestibulum commodo. Sed senectus quam
          tempor pharetra tincidunt. Urna, venenatis netus lacus, odio. Turpis
          lorem quis ut in. Tincidunt aliquam vitae, fermentum quis nibh
          dignissim. Commodo amet phasellus urna cursus fermentum. Id purus quam
          viverra tempus nec bibendum amet. Natoque neque eget platea in tempus.
          Nunc rhoncus aliquet pellentesque quis vitae ornare justo hac. Gravida
          integer eget purus risus eget. Quisque pellentesque proin vestibulum
          commodo.
        </p>
        <div className={classes.grid}>
          <div>
            <h4 className={classes.headerText}>Awards</h4>
            <ul className={classes.list}>
              <li className={`${classes.listItem}`}>
                Science and technology awards
              </li>
              <li className={`${classes.listItem}  ${classes.underline}`}>
                Pierwsza nagroda instytutu 
              </li>
              <li className={`${classes.listItem}  ${classes.underline}`}>
                Anthropology awards
              </li>
              <li className={`${classes.listItem}`}>Archaeology awards</li>
              <li className={`${classes.listItem}`}>Economics awards</li>
              <li className={`${classes.listItem}  ${classes.underline}`}>
                Geography awards
              </li>
              <li className={`${classes.listItem} `}>History awards</li>
              <li className={`${classes.listItem} `}>Politics awards</li>
            </ul>
          </div>
          <div>
            <h4 className={classes.headerText}>Publications</h4>
            <ul className={classes.list}>
              <li className={`${classes.listItem}   ${classes.underline}`}>
                Science and technology awards
              </li>
              <li className={`${classes.listItem}`}>Anthropology awards</li>
              <li className={`${classes.listItem}`}>Archaeology awards</li>
              <li className={`${classes.listItem} ${classes.underline}`}>
                Economics awards
              </li>
              <li className={`${classes.listItem} `}>Geography awards</li>
              <li className={`${classes.listItem} `}>History awards</li>
              <li className={`${classes.listItem} `}>Politics awards</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default About;

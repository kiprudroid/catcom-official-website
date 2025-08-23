import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import styles from "./Join.module.css";
import React from "react";

function Join() {
  return (
    <>
      <div className={styles.joinContainer}>
                             <Header className={styles.header} />
        <h2 className={styles.introHeader}>Small Christian Communities</h2>

        <div className={styles.scc}>
          <h3> What's an SCC?</h3>
          <p>
            A Small Christian Community (SCC) is the Church within the
            neighbourhood, comprising a manageable group of families, which help
            to promote communion, co-responsibility, and gives every member a
            sense of belonging to the Church.
          </p>
        </div>

        <div className={styles.sccMembership}>
          <div>
            <h4>SCC Membership</h4>
            <h3>You should be a member</h3>
            <p>
              All parishioners, unless they're currently students who already
              attend their own bible study groups, are encouraged to identify
              with one Small Christian Community (SCC) and join. It is the
              proper way of being an authentic part of a community of believers.
            </p>
            <div></div>
            <div>
              <img
                className={styles.churchIcon}
                src="/others/st_augustine.jpg"
                alt=""
              />
              <p>St. Augustine 1st Mass</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                eaque temporibus! Repellat quibusdam maiores beatae quasi
                aliquid voluptatum est animi nostrum minus, a quisquam molestiae
                praesentium accusantium perferendis nisi ab tempore, et
                assumenda explicabo cum vero. Ipsum consectetur nihil et.
              </p>
            </div>
            <div>
              <img
                className={styles.churchIcon}
                src="/others/st_augustine.jpg"
                alt=""
              />

              <p>St. Augustine 2nd Mass</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                eaque temporibus! Repellat quibusdam maiores beatae quasi
                aliquid voluptatum est animi nostrum minus, a quisquam molestiae
                praesentium accusantium perferendis nisi ab tempore, et
                assumenda explicabo cum vero. Ipsum consectetur nihil et.
              </p>
            </div>
            <div>
              <img
                className={styles.churchIcon}
                src="/others/st_augustine.jpg"
                alt=""
              />

              <p>St. Augustine 3rd Mass</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                eaque temporibus! Repellat quibusdam maiores beatae quasi
                aliquid voluptatum est animi nostrum minus, a quisquam molestiae
                praesentium accusantium perferendis nisi ab tempore, et
                assumenda explicabo cum vero. Ipsum consectetur nihil et.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.joinForm}>
          <form action="">
            <h3>Joining Jumuiya/SCC</h3>
            <label htmlFor="Your Name">Your Name</label>
            <input type="text" />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" />
            <label htmlFor=" email">Your E-mail</label>
            <input type="email" />
            <label htmlFor="Your Name">Choose Gender </label>
            <input type="text" />
            <label htmlFor="Your Name">Your Residential Location</label>
            <input type="text" />

            <button>Join SCC</button>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Join;

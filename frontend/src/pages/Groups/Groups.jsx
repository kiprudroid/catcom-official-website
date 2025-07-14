import styles from "./Groups.module.css";
import Header from "../../reusable-components/Header/Header";
import React, { useState } from "react";
import Footer from "../../reusable-components/Footer/Footer";

function GroupCard({ imgSrc, alt, title, description }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 120; // Number of characters to show when collapsed

  const isLong = description.length > maxLength;
  const displayText =
    expanded || !isLong
      ? description
      : description.slice(0, maxLength) + "...";

  return (
    <div className={styles.groupCard}>
      <img src={imgSrc} alt={alt} />
      <h3>{title}</h3>
      <p>
        {displayText}
        {isLong && (
          <button
            className={styles.showMoreBtn}
            onClick={() => setExpanded((e) => !e)}
            type="button"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function Groups() {
  return (
    <>
      <div>
        <Header />
        <div>
          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <img
                src="/others/Group.jpg"
                alt="Church Group Icon"
                className={styles.infoIcon}
                style={{ width: "100px", height: "100px", marginRight: "1rem" }}
              />
              <h1>Groups in St Augustine</h1>
            </div>
            <div>
              {/* <h2>Groups in St Augustine</h2> */}
              <p>
                St. Augustine's Chapel has about 14 different groups among which
                you can choose which one best fits you that you may be able to
                actively participate in the body of the church. The groups meet
                regularly and at varied times with each group having its own
                norms and calendar. Below are some of the groups.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.groupsGrid}>
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Choir"
            title="Choir"
            description="There is the Community Choir that animates the 11:30am Mass on
              Sundays and takes major role during community celebrations, then
              there is the Students' Choir that animates the 9:00am Mass on
              Sundays. It's perhaps one of the most popular choirs in the
              region."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Pastoral Team"
            title="Pastoral Team"
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Welfare"
            title="Welfare "
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Communion and Liberation"
            title="Communion and Liberation"
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Sacred Heart"
            title="Sacred Heart"
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Bible Prayer Service"
            title="Bible Prayer Service "
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Liturgical Dancers"
            title="Liturgical Dancers"
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
          <GroupCard
            imgSrc="/sccPictures/stPaul/picture1.png"
            alt="Technical Team"
            title="Technical Team "
            description="Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore."
          />
        </div>
        <div>
          <div className={styles.joinForm}>
            <form className={styles.formGrid}>
              <h2>Joining a Group</h2>
              <div className={styles.formRow}>
                <div className={styles.formCol}>
                  <label htmlFor="name">First Name</label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="name">Last Name</label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id="phone" name="phone" />
                  <label htmlFor="email">Your E-mail</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className={styles.formCol}>
                  <label className={styles.groupLabel}>
                    Select Which Group(s) to Join
                  </label>
                  <div className={styles.checkboxGroup}>
                    <div>
                      <input
                        type="checkbox"
                        id="choir"
                        name="groups"
                        value="Choir"
                      />
                      <label htmlFor="choir">Choir</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="cjpc"
                        name="groups"
                        value="CJPC"
                      />
                      <label htmlFor="cjpc">CJPC</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="eucharistic"
                        name="groups"
                        value="Eucharistic Ministry"
                      />
                      <label htmlFor="eucharistic">Eucharistic Ministry</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="lectors"
                        name="groups"
                        value="Lectors"
                      />
                      <label htmlFor="lectors">Lectors</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="men"
                        name="groups"
                        value="Men of St. Paul's"
                      />
                      <label htmlFor="men">Men of St. Paul's</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="cwa"
                        name="groups"
                        value="CWA"
                      />
                      <label htmlFor="cwa">CWA</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="friends"
                        name="groups"
                        value="Friends of St. Paul's"
                      />
                      <label htmlFor="friends">Friends of St. Paul's</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="spy"
                        name="groups"
                        value="SPY"
                      />
                      <label htmlFor="spy">SPY</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="legion"
                        name="groups"
                        value="Legion of Mary"
                      />
                      <label htmlFor="legion">Legion of Mary</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="sacred"
                        name="groups"
                        value="Sacred Heart"
                      />
                      <label htmlFor="sacred">Sacred Heart</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="pmc"
                        name="groups"
                        value="PMC"
                      />
                      <label htmlFor="pmc">PMC</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="family"
                        name="groups"
                        value="Family Life Group"
                      />
                      <label htmlFor="family">Family Life Group</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="ushers"
                        name="groups"
                        value="Ushers & Helpers"
                      />
                      <label htmlFor="ushers">Ushers & Helpers</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="selfhelp"
                        name="groups"
                        value="Self Help Group"
                      />
                      <label htmlFor="selfhelp">Self Help Group</label>
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.joinBtn}>Join Group</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

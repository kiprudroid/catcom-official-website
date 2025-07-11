import styles from "./Groups.module.css";
import Header from "../../reusable-components/Header/Header";
import React from "react";
import Footer from "../../reusable-components/Footer/Footer";

export default function Groups() {
  return (
    <>
      <div>
        <Header />
        <div>
          <div>
            <p>some icon beside this title</p>
            <h1>Groups title</h1>
          </div>
        </div>
        <div>
          <h2>Groups in St Augustine</h2>
          <p>
            St. Augustine's Chapel has about 14 different groups among which you
            can choose which one best fits you that you may be able to actively
            participate in the body of the church. The groups meet regularly and
            at varied times with each group having its own norms and calendar.
            Below are some of the groups.
          </p>
        </div>
        <div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />
            <h3>Choir</h3>
            <p>
              There is the Community Choir that animates the 11:30am Mass on
              Sundays and takes major role during community celebrations, then
              there is the Students' Choir that animates the 9:00am Mass on
              Sundays. It's perhaps one of the most popular choirs in the
              region.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Pastoral Team</h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Welfare </h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Communion and Liberation</h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Sacred Heart</h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Bible Prayer Service </h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Liturgical Dancers</h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
          <div>
            <img src="/sccPictures/stPaul/picture1.png" alt="" />

            <h3>Technical Team </h3>
            <p>
              Devotion to the Sacred heart of Jesus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab magni necessitatibus quia eaque
              possimus quam cumque officia modi quod illum enim unde temporibus
              nihil odio aut assumenda deleniti, sit incidunt quos, ex porro.
              Numquam mollitia veniam aspernatur molestias quisquam labore.
            </p>
          </div>
        </div>
        <div>
          <div className={styles.joinForm}>
            <form action="">
              <h3>Joining a Group</h3>
              <label htmlFor="Your Name">Your Name</label>
              <input type="text" />
              <label htmlFor="phone">Phone Number</label>
              <input type="text" />
              <label htmlFor=" email">Your E-mail</label>
              <input type="email" />
              <label htmlFor="Your Name">Choose Gender </label>
              <input type="text" />
              <label htmlFor="Your Name">Select Which Group(s) to Join</label>
              <input type="text" />

              <div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Communion and Liberation </label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Pastoral Team</label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Bible Prayer Service</label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Welfare</label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Choir </label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Liturgical Dancers </label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Sacred Heart </label>
                </div>
                <div>
                  <input type="radio" name="group" />
                  <label htmlFor="groupC">Technical Team </label>
                </div>
              </div>

              <button>Join Group</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

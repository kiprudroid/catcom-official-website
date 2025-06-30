import React from "react";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import styles from "./Liturgy.module.css";
import Readings from "../../components/Readings/Readings.jsx";
import PrayerSection from "../../components/PrayerSection/PrayerSection.jsx";

function Liturgy() {
  return (
    <>
      <div className={`${styles.gridContainer}`}>
        <Header className={styles.header} />

        <div className={`${styles.readings} item`}>
          <div className={styles.contentTitle}>
            <h3>Thursday of the Eighth Week in Ordinary Times</h3>
            <p> Date: 22/02/2025</p>
          </div>

          <Readings
            title="A reading from the book of Deutronomy"
            text=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!"
            className={styles.firstReading}
          />
          <Readings
            title="Responsorial Psalms"
            text=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!"
            className={styles.psalms}
          />
          <Readings
            title="Gospel Reading"
            text=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!"
            className={styles.secondReading}
          />
        </div>

        <div className={`${styles.prayers} item`}>
          <div className={styles.prayerTitle}>PRAYERS</div>
          <PrayerSection
            title="Sign of the Cross"
            text=" In the name of the Father, and of the Son, and of the Holy Spirit.
              Amen."
            className={styles.signOfCross}
          />

          <PrayerSection
            title="Our Father"
            text="  Our Father, who art in heaven, hallowed be Thy name. Thy kingdom
              come, Thy will be done on earth as it is in Heaven. Give us this
              day our daily bread; and forgive us our trespasses as we forgive
              those who trespass against us. Do not lead us into tempta tation,
              but deliver us from all evil. Amen."
            className={styles.ourFather}
          />
          <PrayerSection
            title="Hail Mary"
            text="  Our Father, who art in heaven, hallowed be Thy name. Thy kingdom
              come, Thy will be done on earth as it is in Heaven. Give us this
              day our daily bread; and forgive us our trespasses as we forgive
              those who trespass against us. Do not lead us into tempta tation,
              but deliver us from all evil. Amen."
            className={styles.hailMary}
          />

          <PrayerSection
            title="Apostles Creed"
            text="  I believe in God, the Father Almighty, Creator of heaven and
              earth; and in Jesus Christ, His only Son, our Lord: Who was
              conceived by the Holy Spirit, born of the Virgin Mary; suffered
              under Pontius Pilate, was crucified, died and was buried. He
              descended into hell; the third day He rose again from the dead; He
              ascended into heaven, is seated at the right hand of God the
              Father Almighty; from thence He shall come to judge the living and
              the dead. I believe in the Holy Spirit, the Holy Catholic Church,
              the com munion of Saints, the forgiveness of sins, the
              resurrection of the body, and life everlast ing. Amen."
            className={styles.apostlesCreed}
          />

          <PrayerSection
            title="Doxology"
            text="   Glory be to the Father, and to the Son, and to the Holy Spirit. As
              it was in the beginning, is now and ever shall be, world without
              end. Amen."
            className={styles.doxology}
          />
          <PrayerSection
            title="Hail Holy Queen"
            text="   Hail, Holy Queen, Mother of Mercy,Hail our life, our sweetness and
              our hope. To you do we cry, poor banished children of Eve. To you
              do we send up our sighs, mourning and weeping in this valley of
              tears Turn then, most gracious advocate, your eyes of mercy toward
              us, and after this exile show unto us the blessed fruit of thy
              womb, Jesus. O clement, O loving, O sweet Virgin Mary."
            className={styles.holyQueen}
          />
          <PrayerSection
            title="Act of Faith"
            text="   O my God, I firmly believe that You are one God in three divine
              persons, Father, Son and Holy Spirit. I believe that Your divine
              Son became man and died for our sins, and that he will come to
              judge the living and the dead. I believe these and all the truths
              which the holy Catholic Church teaches because You have revealed
              them, who can neither deceive nor be deceived. Amen."
            className={styles.faith}
          />
          <PrayerSection
            title="Act of Hope"
            text="    O my God, trusting in Your promises and because You are faithful,
              powerful and merciful, I hope, through the merits of Jesus Christ,
              for the pardon of my sins, final perseverance and the blessed
              glory of heaven."
            className={styles.hope}
          />
          <PrayerSection
            title="Act of Love"
            text="   O my God, because You are infinite goodness and worthy of infinite
              love, I love You with my whole heart above all things, and for
              love of You I love my neighbor as myself. I forgive all who have
              offended me and ask pardon of all whom I have offended."
            className={styles.love}
          />
          <PrayerSection
            title="Act of contrition"
            text="   O my God, I am heartily sorry for having offended Thee and I
              detest all my sins, because I dread the loss of heaven and the
              pains of hell; but most of all because they offend Thee, my God,
              Who are all good and deserving of all my love. I firmly resolve,
              with the help of Thy grace, to confess my sins, to do penance, and
              to amend my life. Amen."
            className={styles.contrition}
          />
          <PrayerSection
            title="Morning Offering"
            text="   O Jesus, through the Immaculate Heart of Mary, I offer You my
              prayers, works, joys and sufferings of this day in union with the
              Holy Sacrifice of the Mass throughout the world. I offer them for
              all the intentions of the Sacred Heart: the salvation of souls,
              reparation for sin, the reunion of all Christians, and the
              intentions of our Holy Father, the Pope. Amen."
            className={styles.offering}
          />
          <PrayerSection
            title="Prayer in the Morning"
            text="   Blessed be the Lord, the God of Israel; He has come to His people
              and set them free. He has raised up for us a mighty savior, born
              of the house of His servant David. Through His holy prophets he
              promised of old that he would save us from our enemies, from the
              hands of all who hate us. He promised to show mercy to our fathers
              and to remember His holy covenant. This was the oath he swore to
              our father Abraham: to set us free from the hands of our enemies,
              free to worship him without fear, holy and righteous in His sight
              all the days of our life. You, my child, shall be called the
              prophet of the Most High; for You will go before the Lord to
              prepare His way, to give His people knowledge of salvation by the
              forgiveness of their sins. In the tender compassion of our God the
              dawn from on high shall break upon us, to shine on those who dwell
              in darkness and the shadow of death, and to guide our feet into
              the way of peace.(Luke 1:68-79)"
            className={styles.morningPrayer}
          />
          <PrayerSection
            title="Prayer in the Evening"
            text=" My soul proclaims the greatness of the Lord, my spirit rejoices in
              God my Savior; for he has looked with favor on His lowly servant.
              From this day all generations will call me blessed: the Almighty
              has done great things for me, and holy is His Name. He has mercy
              on those who fear Him in every generation. He has shown the
              strength of His arm, he has scattered the proud in their conceit.
              He has cast down the mighty from their thrones, and has lifted up
              the lowly. He has filled the hungry with good things, and the rich
              he has sent away empty. He has come to the help of His servant
              Israel for He has remembered His promise of mercy, the promise He
              made to our fathers, to Abraham and His children for ever. (Luke
              1:46-55) O eternal God and Ruler of all creation, You have allowed
              me to reach this hour. Forgive the sins I have committed this day
              by word, deed or thought. Purify me, O Lord, from every spiritual
              and physical stain. Grant that I may rise from this sleep to
              glorify You by my deeds throughout my entire lifetime, and that I
              be victorious over every spiritual and physical enemy. Deliver me,
              O Lord, from all vain thoughts and from evil desires, for yours is
              the kingdom, and the power, and the glory, Father, Son, and Holy
              Spirit, now and ever, and forever. Amen."
            className={styles.eveningPrayer}
          />
          <PrayerSection
            title="Prayer at Night"
            text="  O my God, I thank You for having preserved me today and for having
              given me so many blessings and graces. I renew my dedication to
              You and ask Your pardon for all my sins. (review the day quietly
              then pray The Canticle of Simeon which follows) Protect us, Lord,
              as we stay awake; watch over us as we sleep, that awake we may
              keep watch with Christ, and asleep, rest in His peace (alleluia).
              Lord, now let Your servant go in peace; according to Your word:
              for my eyes have seen Your salvation which You have prepared in
              the presence of all peoples: a light for revelation to the
              Gentiles and for glory to Your people Israel. (Luke 2:29–32) Glory
              be to the Father, and to the Son, and to the Holy Spirit. As it
              was in the beginning, is now and ever shall be, world without end.
              Amen. Protect us, Lord, as we stay awake; watch over us as we
              sleep, that awake we may keep watch with Christ, and asleep, rest
              in His peace (alleluia)."
            className={styles.nightPrayer}
          />
          <PrayerSection
            title="Grace Before Meals"
            text=" Bless us, O Lord, and these your gifts which we are about to
                receive from Thy bounty. Through Christ our Lord. Amen."
            className={styles.beforeMeals}
          />
          <PrayerSection
            title="Grace Before Meals"
            text=" Bless us, O Lord, and these your gifts which we are about to
                receive from Thy bounty. Through Christ our Lord. Amen."
            className={styles.beforeMeals}
          />
        </div>

        <div className={`${styles.rosary} item`}>
          <p>Holy Rosary Prayers</p>
        </div>
        <div className={`${styles.divineMercy} item`}>
          <p>Divine Mercy</p>
        </div>
        <div className={`${styles.wayOfCross} item`}>
          <p> The Way Of the Cross</p>
        </div>

        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default Liturgy;

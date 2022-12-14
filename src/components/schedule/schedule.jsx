import React, { useState } from "react";
import classes from "./schedule.css";
import {
  scheduleData,
  locations,
  locationAndDance,
} from "../../data/scheduleData";
import AddressItem from "./addressItem";
import DanceItem from "./danceItem";
import ScheduleDayItem from "./scheduleDayItem";

const Schedule = (props) => {
  const [activeAdress, setActiveAdress] = useState("Львів, Лемківська 15");

  const filteredByAdresss = scheduleData.filter((obj) =>
    activeAdress.includes(obj.adress)
  );
  filteredByAdresss.sort((x, y) => x.hour - y.hour);

  const danceOnAddress = [...new Set(filteredByAdresss.map((a) => a.dance))];
  const sortdanceOnAddress = danceOnAddress.sort();

  const [activeDance, setActiveDance] = useState(danceOnAddress[0]);
  const danceCategory = filteredByAdresss.filter((obj) =>
    activeDance.includes(obj.dance)
  );

  const week = [
    "ПОНЕДІЛОК",
    "ВІВТОРОК",
    "СЕРЕДА",
    "ЧЕТВЕР",
    "П'ЯТНИЦЯ",
    "СУБУТА",
    "НЕДІЛЯ",
  ];

  const onAllDanceClick = () => {
    setActiveDance();
  };

  return (
    <>
      <section id="schedule">
        <div className="content">
          <div className="select-address">
            <h3 className="title-select">Виберіть зал для занять</h3>
            <div className="address-items">
              {locations.map((place, index) => (
                <AddressItem
                  activeAdress={activeAdress}
                  setActiveAdress={setActiveAdress}
                  locationAndDance={locationAndDance}
                  setActiveDance={setActiveDance}
                  place={place}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="content">
          <div className="select-dance">
            <h3 className="title-select">Вибери категорію танців</h3>
            <div className="select-dance-items">
              <ul className="all-dance">
                {sortdanceOnAddress.map((dance, index) => (
                  <DanceItem
                    activeDance={activeDance}
                    setActiveDance={setActiveDance}
                    key={index}
                    dance={dance}
                  />
                ))}
              </ul>
              <ul className="all-dance">
                <li onClick={onAllDanceClick} className="select-dance-item">
                  <span>ВСІ ТАНЦІ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="content-schedule">
          <div className="schedule-background"></div>
          <div className="schedule content">
            <h2 className="schedule-title">{activeAdress}</h2>
            {week.map((data, index) => (
              <ScheduleDayItem
                data={data}
                key={index}
                danceCategory={danceCategory}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;

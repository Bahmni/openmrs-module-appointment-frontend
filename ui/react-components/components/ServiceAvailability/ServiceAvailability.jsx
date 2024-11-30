import React, {useEffect, useState} from "react";

import "./ServiceAvailability.scss";
import classNames from 'classnames';
import {getWeekDays} from "../../services/WeekDaysService/WeekDaysService";
import {useIntl} from "react-intl";
import moment from "moment";

export default function ServiceAvailability() {
  const intl = useIntl();
  const [invalidTime, setInvalidTime] = useState(false);
  const [minInputComplete, setMinInputComplete] = useState(false);
  const [activeSlot, setActiveSlot] = useState(0);
  const dummySlot = {
    startTime: "",
    endTime: "",
    maxLoad: 0,
    weekDays: [],
    isAdded : false
  };
  const [slots, setSlots] = useState([dummySlot]);

  useEffect(() => {
    const startTime = slots[activeSlot].startTime;
    const endTime = slots[activeSlot].endTime;
    const weekDays = slots[activeSlot].weekDays;
    if (!startTime || !endTime) {
      setInvalidTime(false);
      return;
    }
    const isStartTimeAfterEndTime = moment(startTime, "HH:mm").isAfter(moment(endTime, "HH:mm"));
    if (startTime && endTime && (isStartTimeAfterEndTime || endTime === startTime)) {
      setInvalidTime(true);
      return;
    }
    setInvalidTime(false);
    if (weekDays.length > 0) {
      setMinInputComplete(true);
      return;
    }
    setMinInputComplete(false);
  }, [slots]);

  const WeekDayButton = ({weekDay, slotIndex}) => {
    const weekDays = slots[slotIndex].weekDays;
    const isEnabled = () => weekDays.map(day => day.defaultValue).includes(weekDay.defaultValue);
    const handleToggle = () => {
      setActiveSlot(slotIndex);
      let daysToggledOn;
      daysToggledOn = isEnabled() ? weekDays.filter((day) => day.defaultValue !== weekDay.defaultValue) : [...weekDays, weekDay];
      const modifiedSlot = {...slots[slotIndex], weekDays: daysToggledOn};
      const slotsCopy = [...slots];
      slotsCopy.splice(slotIndex, slotIndex + 1, modifiedSlot);
      setSlots(slotsCopy);
    };
    return <span role="button" onClick={() => handleToggle()}
                 className={classNames("button", {active: isEnabled()})}>{intl.formatMessage({
      id: weekDay.translationKey,
      defaultMessage: weekDay.defaultValue
    })}</span>
  };

  const handleAddSlot = () => {
    const modifiedSlot = {...slots[activeSlot], isAdded: true};
    const slotsCopy = [...slots];
    slotsCopy.splice(activeSlot, activeSlot + 1, modifiedSlot);
    setSlots([...slotsCopy, dummySlot]);
    setActiveSlot(currentIndex => currentIndex + 1);
    setInvalidTime(false);
    setMinInputComplete(false);
  };


  return (
    <ul>
      {slots.map((slot,index) => {
            return <li className={"service-availability"}>
              <div className={`service ${slot.isAdded ? "unsaved" : ""}`}>
                <div style={{marginRight: "5px"}}>
                  <label htmlFor="startTime">Start Time</label>
                  <input name="startTime"
                         type="time" onChange={(e) => {
                    setActiveSlot(index);
                    const modifiedSlot = {...slot, startTime: e.target.value};
                    const slotsCopy = [...slots];
                    slotsCopy.splice(index, index + 1, modifiedSlot);
                    setSlots(slotsCopy);
                  }}/>
                </div>
                <div style={{marginRight: "5px"}}>
                  <label htmlFor="endTime">End Time</label>
                  <input name="endTime"
                         type="time" onChange={(e) => {
                    setActiveSlot(index);
                    const modifiedSlot = {...slot, endTime: e.target.value};
                    const slotsCopy = [...slots];
                    slotsCopy.splice(index, index + 1, modifiedSlot);
                    setSlots(slotsCopy);
                  }}/>
                </div>
                <div style={{marginRight: "5px"}}>
                  <label htmlFor="maxLoad">Max Load</label>
                  <input type="number" min={0} onChange={(e) => {
                    setActiveSlot(index);
                    const modifiedSlot = {...slot, maxLoad: e.target.value};
                    const slotsCopy = [...slots];
                    slotsCopy.splice(index, index + 1, modifiedSlot);
                    setSlots(slotsCopy);
                  }}/>
                </div>
                <div>
                  {
                    [...getWeekDays('MONDAY').values()].map((weekDayValue) =>
                      <WeekDayButton weekDay={weekDayValue} slotIndex={index}/>)
                  }
                </div>
                {slots[index].isAdded ? (
                    <div className="buttonContainer">
                      <i
                        className="fas fa-pencil-alt edit"
                        aria-hidden="true"
                        data-testid="picker-button"
                      >
                      </i>
                      <i
                        className="fas fa-trash-alt delete"
                        aria-hidden="true"
                        data-testid="picker-button">
                      </i>
                    </div>
                  ) : (minInputComplete ?
                  <div>
                    <button onClick={() => handleAddSlot()}>add</button>
                  </div> :
                  <div>
                    <button disabled>add</button>
                  </div>)
                }
              </div>
              {activeSlot===index && invalidTime && <p> End time must be after Start time</p>}
            </li>;
        }
      )}
    </ul>
  );
}
;

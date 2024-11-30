import React from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./AddService.scss"
import ServiceAvailability from "../ServiceAvailability/ServiceAvailability";
import {IntlProvider} from "react-intl";

export default function AddService() {
  const colors = ["#006400", "#DC143C", "#00008B", "#3F51B5", "#B8860B", "#A9A9A9", "#BDB76B", "#8B008B", "#556B2F",
    "#FF8C00", "#9932CC", "#8B0000", "#8FBC8F", "#483D8B", "#2F4F4F", "#3E2723", "#00CED1", "#9400D3", "#FF1493", "#00BFFF"];
  return <div className="service-wrapper">
    <div className="services-title">
      <h2>Services</h2>
      <button>Save</button>
    </div>
    <form>
      <section>
        <div className="add-service">
          <p>
            <label htmlFor="name">
              Service Name<span className="asterick">*</span>
            </label>
            <input placeholder="Enter a service name" id="name" name="name" type="text"/>
          </p>
          <p>
            <label htmlFor="description" style={{verticalAlign: "top"}}>
              Description
            </label>
            <textarea placeholder="Enter description" id="description"/>
          </p>
          <p>
            <label htmlFor="duration">
              Duration
            </label> <input placeholder="Mins" id="duration" type="number" min="0"/>
          </p>
          <p name="serviceTime">
            <label htmlFor="start-time">
              Start Time
            </label> <input id="start-time" type="time"/>
            <label htmlFor="end-time" style={{textAlign: "left", minWidth: "63px", marginLeft: "5px"}}>
              End Time
            </label> <input id="end-time" type="time"/>
          </p>
          <p>
            <label htmlFor="max-load">
              Max Load
            </label> <input placeholder="Appointments limit" id="max-load" type="number" min="0"/>
          </p>

          <p>
            <label htmlFor="speciality">
              Speciality
            </label>
            <select id="speciality">
              <option value="" selected="selected">Select a speciality</option>
            </select>
          </p>
          <p>
            <label htmlFor="location">
              Location
            </label>
            <select id="location">
              <option value="" selected="selected">Select a location</option>
            </select>
          </p>
          <p>
            <label htmlFor="labelColour">Label Colour</label>
            <ColorPicker name="labelColour" colors={colors} selectedColor={colors[0]} onSelect={() => {
            }}/>
          </p>
          Add Service Appointment Type
          <p>
            <label>Add new type</label>
            <input placeholder="Service type name" type="text" id="serviceTypeName"
                   name="serviceTypeName" style={{width: "120px"}}/>
            <label style={{marginLeft: "5px", minWidth: "10%"}}>Duration</label>
            <input placeholder="Mins" type="number" min="0"
                   style={{width: "47px", marginRight: "1%", paddingRight: "0"}}/>
            <button type="button" disabled="disabled"> Add</button>
          </p>
        </div>
        <div className="add-availability">
          <h3>Service Availability</h3>
          <IntlProvider locale="en">
              <ServiceAvailability/>
          </IntlProvider>
        </div>
      </section>
    </form>
  </div>
}

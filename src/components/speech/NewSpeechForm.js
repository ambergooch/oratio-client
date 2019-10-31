import React, { useRef, useEffect, useState } from "react";

const newSpeechForm = props => {
  const title = useRef();
  const set_time = useRef();
  const events = useRef();

  const [events, setEvents] = useState([]);

  // function that adds a product to the products list on the products page
  // this function is being called when you click the add to product button
  const addToSpeeches = e => {
    e.preventDefault();
    // object that grabs all the values for new product
    const newSpeechObject = {
      user_id: localStorage.getItem("user_id"),
      title: title.current.value,
      date: "",
      set_time: set_time.current.value,
      actual_time: "",
      transcript: "",
      events: events.current.value,
      um: "",
      uh: "",
      like: ""
    };
    // post request from API manager that connects create method on server side to post on client side
  };
  // function gets all product types - we need to get all product types because we need to view all of them in our dropdown
  const getEvents = () => {
    fetch(`http://localhost:8000/events`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setEvents(response);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  // product form that shows in the browser that the user is able to fill out
  // in the producttype drop down we have to map through productType and we will get the value of the producttype id
  //when we select the producttype we want
  return (
    <React.Fragment>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" Title="title" ref={title} placeholder="Title" />
        </div>
        <div>
          <label htmlFor="set_time">Set a time limit</label>
          <input type="text" name="set_time" ref={set_time} placeholder="Enter time" />
        </div>
        <div>
          <label htmlFor="events">Select an Event</label>
          <select type="events" name="events" ref={events}>
            <option>Select an Event</option>
            {events.map(event => {
              return (
                <option
                  key={event.id}
                  id={event.id}
                  value={event.id}
                >
                  {event.name}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={e => addToSpeeches(e)}>Start</button>
      </form>
    </React.Fragment>
  );
};
export default newSpeechForm;

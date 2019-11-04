import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../modules/APIManager"

const EditSpeechForm = props => {
  const [speech, setSpeech] = useState([]);
  const current_inventory = useRef();
  const { isAuthenticated } = useSimpleAuth();
  const speechId = props.match.params.speechId

  const getMySpeech = () => {
    if (isAuthenticated()) {
      APIManager.getOne("speeches", speechId)
      .then(setSpeech)
    }
  }

  const updateSpeech = () => {
    const updatedSpeechObject = {
      transcript: transcript.current.value
    }
    APIManager.put("speeches", updatedSpeechObject, speechId)
      .then(() => {
      props.history.push("/speeches/${speechId}")
    })
  };

  const addToEvent = () => {
    const speechIdObject = {speech_id: singleSpeech.id}
    APIManager.post("events", speechIdObject)
}

  useEffect(() => {
    getMyProduct();
  }, []);

  return (
    <>
      {open && (
      <div>
        <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            size='small'
            onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}

            onClose={(event) => {
                document.body.classList.remove('modal-fade-in')
                handleClose()
            }}>
            <Modal.Header>Create a New Speech</Modal.Header>
            <Modal.Content>
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" ref={title} placeholder="Title" />
                    </div>
                    <div>
                        <label htmlFor="set_time">Set a time limit</label>
                        {/* <input type="text" name="set_time" id="set_time" ref={set_time} placeholder="Enter time" required /> */}
                        <input type="time" value="mm:ss" min="0:00" max="0:00:3600" name="set_time" id="set_time" ref={set_time} placeholder="Enter time" required />
                        {/* <TimePicker  popupStyle={{ fontSize: '30px' }}
                            showHour={false}
                            secondStep={15}
                            clearText='clear'
                            onChange={(e) => handleFieldChange(e)}/> */}
                    </div>
                    <EventSelector {...props} getRef={childRef}/>
                    {/* <div>
                        <label htmlFor="events">Select an Event</label>
                        <select type="text" name="events" ref={events}>
                            <option>Select an Event</option>
                            {fetchedEvents.map(event => {
                                return (
                                    <option key={event.id} id={event.id} value={event.id}>
                                        {event.name}
                                    </option>
                                )
                            })}
                        </select>
                        <button onClick={createEvent}>Create new event</button>
                    </div> */}
                </form>
            </Modal.Content>
            <Modal.Actions>
                {/* <Button onClick={handleClose} negative>
                Close
                </Button> */}
                <Button
                onClick={handleClick}
                positive
                content='Start'
                />
            </Modal.Actions>
        </Modal>
        <div key={myProduct.id} className="card">
          <ul>
            <li>{myProduct.name}</li>
            <li>${myProduct.price}</li>
            <li>Description: {myProduct.description}</li>
            <li>
              Enter number of new stock: {}
              <input
                ref={current_inventory}
                type="text"
                name="current_inventory"
                required
              ></input>
            </li>

            <li>Sold: {myProduct.total_sold}</li>
            <br />
            <button
              onClick={() =>
                updateMyProduct(myProduct.quantity, myProduct.id)
              }
            >
              Update Quantity
            </button>
          </ul>
        </div>
        </div>
      )}
    </>
  );
};

export default EditSpeechForm;

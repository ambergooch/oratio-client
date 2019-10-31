import React, { useRef, useEffect, useState } from "react";
import { Button, Header, Image, Modal, Divider, TransitionablePortal } from 'semantic-ui-react'

const NewSpeechModal = props => {
    const title = useRef();
    const set_time = useRef();
    const events = useRef();

    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false)

    handleOpen = () => {
      setOpen(true)
    }

    handleClose = () => {
      setOpen(false)
    }

    // function that adds a new speech to the database
    // this function is being called when you click the add to product button
    const addToSpeeches = e => {
        e.preventDefault()
        // object that grabs all the values for the new speech
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
        }
        // post request from API manager that connects create method on server side to post on client side
        APIManager.post("products", newProductInfo).then(() => {
            props.history.push("/products");
          });
    }
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


    return (
    <div>
        <style>{`
        .ui.dimmer {
            transition: background-color 0.5s ease;
            background-color: transparent;
        }

        .modal-fade-in .ui.dimmer {
            background-color: orange;
        }
        `}</style>

        <Button content='Open' onClick={this.handleOpen} />

        <TransitionablePortal
        open={this.state.open}
        onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
        transition={{ animation: 'scale', duration: 500 }}
        >
        <Modal
            open={true}
            onClose={(event) => {
            document.body.classList.remove('modal-fade-in')
            this.handleClose()
            }}
            closeIcon
        >
            <Modal.Header>
            Resize test
            </Modal.Header>
            <Modal.Content>
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            </Modal.Content>
        </Modal>
        </TransitionablePortal>
    </div>
    )
}

  ReactDOM.render(<App />, document.getElementById('app'));
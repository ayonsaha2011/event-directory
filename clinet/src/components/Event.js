import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, deleteEvent } from "../reducers/events";
import EventDataService from "../services/EventService";
import { retrieveCategories } from "../reducers/categories";

const Event = (props) => {
  const initialEventState = {
    id: null,
    title: "",
    description: "",
    category: "",
    address: "",
    isVirtual: false,
    date: "",
    published: false
  };
  const [currentEvent, setCurrentEvent] = useState(initialEventState);
  const [message, setMessage] = useState("");
  const categories = useSelector(state => state.categories);

  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(retrieveCategories());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const getEvent = id => {
    EventDataService.get(id)
      .then(response => {
        setCurrentEvent(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEvent(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = e => {
    let { name, value } = e.target;
    if (name === "isVirtual") {
      value = e.target.checked
    }
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentEvent.id,
      title: currentEvent.title,
      description: currentEvent.description,
      category: currentEvent.category,
      address: currentEvent.address,
      isVirtual: currentEvent.isVirtual,
      date: currentEvent.date,
      published: status
    };

    dispatch(updateEvent({ id: currentEvent.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentEvent({ ...currentEvent, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateEvent({ id: currentEvent.id, data: currentEvent }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The event was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeEvent = () => {
    dispatch(deleteEvent({ id: currentEvent.id }))
      .unwrap()
      .then(() => {
        props.history.push("/events");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEvent ? (
        <div className="edit-form">
          <h4>Event</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentEvent.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
                <select 
                  className="form-control"
                  value={currentEvent.category}
                  onChange={handleInputChange}
                  name="category"
                  id="category"
                >
                  {categories && categories.map((category, index) => (<option key={"category -" + index} value={category.name}>{category.name}</option>))}
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentEvent.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={currentEvent.address}
                onChange={handleInputChange}
              />
            </div>

           

            <div className="form-group">
              <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={currentEvent.isVirtual}
                    id="isVirtual"
                    onChange={handleInputChange}
                    name="isVirtual"
                  />
                  <label className="form-check-label" htmlFor="isVirtual">Is this event virtual ?</label>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={currentEvent.date || ''}
                onChange={handleInputChange}
                name="date"
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentEvent.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentEvent.published ? (
            <button
              className="badge badge-primary mr-4"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-4"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-4" onClick={removeEvent}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Event...</p>
        </div>
      )}
    </div>
  );
};

export default Event;

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveEvents,
  findEventsBy,
  deleteAllEvents,
} from "../reducers/events";
import { retrieveCategories } from "../reducers/categories";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [filter, setFilter] = useState({
    title: "",
    category: ""
  });

  const events = useSelector(state => state.events);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setFilter({...filter, title: searchTitle});
  };

  const onChangeSearchCategory = e => {
    const searchCategory = e.target.value;
    const newFilter = {...filter, category: searchCategory};
    setFilter(newFilter);
    findBy(newFilter);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveEvents());
    dispatch(retrieveCategories());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentEvent(null);
    setCurrentIndex(-1);
  };

  const setActiveEvent = (event, index) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };

  const removeAllEvents = () => {
    dispatch(deleteAllEvents())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findBy = (newFilter) => {
    refreshData();
    dispatch(findEventsBy(newFilter));
  };


  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="form-group mb-3">
          <label htmlFor="category">Select list:</label>
          <select 
            className="form-control" 
            id="category"
            value={filter.category}
            onChange={onChangeSearchCategory}
          >
          <option value="">Select your interest</option>
            {categories && categories.map((category, index) => (<option key={"category -" + index} value={category.name}>{category.name}</option>))}
          </select>
        </div>


      </div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={filter.title}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => findBy(filter)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Events List</h4>

        <ul className="list-group">
          {events &&
            events.map((event, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEvent(event, index)}
                key={index}
              >
                {event.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEvents}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentEvent ? (
          <div>
            <h4>Event</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentEvent.title}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{" "}
              {currentEvent.category}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentEvent.description}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentEvent.address}
            </div>
            <div>
              <label>
                <strong>Date:</strong>
              </label>{" "}
              {currentEvent.date}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentEvent.isVirtual ? "Virtual" : "Physical"}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentEvent.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/events/" + currentEvent.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Event...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;

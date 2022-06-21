import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../reducers/events";
import { retrieveCategories } from "../reducers/categories";

const AddEvent = () => {
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
  const [event, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const categories = useSelector(state => state.categories);

  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(retrieveCategories());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const handleInputChange = e => {
    let { name, value } = e.target;
    if (name === "isVirtual") {
      value = e.target.checked
    }
    setEvent({ ...event, [name]: value });
  };

  const saveEvent = () => {
    const { title, category, description, address, isVirtual, date } = event;

    dispatch(createEvent({ title, category, description, address, isVirtual, date }))
      .unwrap()
      .then(data => {
        console.log(data);
        setEvent({
          id: data.id,
          title: data.title,
          category: data.category,
          description: data.description,
          address: data.address,
          isVirtual: data.isVirtual,
          date: data.date,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEvent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={event.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              className="form-control" 
              id="category" 
              value={event.category}
              onChange={handleInputChange}
              name="category"
              required>
            {categories && categories.map((category, index) => (<option key={"category -" + index} value={category.name}>{category.name}</option>))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              required
              value={event.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div> 
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={event.address || ''}
              onChange={handleInputChange}
              name="address"
            />
          </div>
        
          <div className="form-group">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={event.isVirtual}
                id="isVirtual"
                onChange={handleInputChange}
                name="isVirtual"
              /><label className="form-check-label" htmlFor="isVirtual">Is this event virtual ?</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={event.date || ''}
              onChange={handleInputChange}
              name="date"
            />
          </div>
          <button onClick={saveEvent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEvent;

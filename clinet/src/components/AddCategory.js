import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../reducers/categories";

const AddCategory = () => {
  const initialCategoryState = {
    id: null,
    name: "",
    description: "",
    published: true
  };
  const [category, setCategory] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = e => {
    let { name, value } = e.target;
    if (name === "published") {
      value = e.target.checked
    }
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = () => {
    const { name, description, published } = category;

    dispatch(createCategory({ name, description, published }))
      .unwrap()
      .then(data => {
        console.log(data);
        setCategory({
          id: data.id,
          name: data.name,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCategory = () => {
    setCategory(initialCategoryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCategory}>
            Add Category
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={category.name || ''}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              required
              value={category.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div> 
        
          <div className="form-group">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={category.published}
                id="published"
                onChange={handleInputChange}
                name="published"
              />
              <label className="form-check-label" htmlFor="published">Published</label>
            </div>
          </div>
          
          <button onClick={saveCategory} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategory;

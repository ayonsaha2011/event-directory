import http from "../http-common";

const getAll = () => {
  return http.get("/categories");
};

const get = id => {
  return http.get(`/categories/${id}`);
};

const create = data => {
  return http.post("/categories", data);
};


const CategoryService = {
  getAll,
  get,
  create
};

export default CategoryService;
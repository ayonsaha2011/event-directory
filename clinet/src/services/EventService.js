import http from "../http-common";

const getAll = () => {
  return http.get("/events");
};

const get = id => {
  return http.get(`/events/${id}`);
};

const create = data => {
  return http.post("/events", data);
};

const update = (id, data) => {
  return http.put(`/events/${id}`, data);
};

const remove = id => {
  return http.delete(`/events/${id}`);
};

const removeAll = () => {
  return http.delete(`/events`);
};

const findBy = obj => {
  let q= "";
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    if(value){
      if(i === 0) {
        q += `${key}=${value}`;
      } else {
        q += `&${key}=${value}`;
      }
    }
  }

  return http.get(`/events?${q}`);
};

const EventService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBy
};

export default EventService;
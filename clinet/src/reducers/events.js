import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventDataService from "../services/EventService";

const initialState = [];

export const createEvent = createAsyncThunk(
  "events/create",
  async ({ title, description, category, address, isVirtual, date }) => {
    const res = await EventDataService.create({ title, description, category, address, isVirtual, date });
    return res.data;
  }
);

export const retrieveEvents = createAsyncThunk(
  "events/retrieve",
  async () => {
    const res = await EventDataService.getAll();
    return res.data;
  }
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, data }) => {
    const res = await EventDataService.update(id, data);
    return res.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/delete",
  async ({ id }) => {
    await EventDataService.remove(id);
    return { id };
  }
);

export const deleteAllEvents = createAsyncThunk(
  "events/deleteAll",
  async () => {
    const res = await EventDataService.removeAll();
    return res.data;
  }
);

export const findEventsBy = createAsyncThunk(
  "events/findBy",
  async (obj) => {
    const res = await EventDataService.findBy(obj);
    return res.data;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: {
    [createEvent.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveEvents.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateEvent.fulfilled]: (state, action) => {
      const index = state.findIndex(event => event.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteEvent.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllEvents.fulfilled]: (state, action) => {
      return [];
    },
    [findEventsBy.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = eventSlice;
export default reducer;
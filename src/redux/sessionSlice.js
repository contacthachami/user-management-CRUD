import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSessionActive: true, // Indique si la session est active
  lastActivity: Date.now(), // Horodatage de la dernière activité
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },
    endSession: (state) => {
      state.isSessionActive = false;
    },
    resetSession: (state) => {
      state.isSessionActive = true;
      state.lastActivity = Date.now();
    },
  },
});

export const { updateLastActivity, endSession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;

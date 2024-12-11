import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  sortOrder: 'asc',
  filterText: '',
  selectedUsers: []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ 
        id: Date.now(), 
        name: action.payload,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.selectedUsers = state.selectedUsers.filter(id => id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, name } = action.payload;
      const userToUpdate = state.users.find(user => user.id === id);
      if (userToUpdate) {
        userToUpdate.name = name;
        userToUpdate.lastModified = new Date().toISOString();
      }
    },
    toggleUserSelection: (state, action) => {
      const userId = action.payload;
      const index = state.selectedUsers.indexOf(userId);
      if (index === -1) {
        state.selectedUsers.push(userId);
      } else {
        state.selectedUsers.splice(index, 1);
      }
    },
    deleteSelectedUsers: (state) => {
      state.users = state.users.filter(user => !state.selectedUsers.includes(user.id));
      state.selectedUsers = [];
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    }
  }
});

export const { 
  addUser, 
  deleteUser, 
  updateUser, 
  toggleUserSelection,
  deleteSelectedUsers,
  setSortOrder,
  setFilterText
} = userSlice.actions;

export default userSlice.reducer;
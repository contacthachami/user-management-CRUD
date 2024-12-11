import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../redux/userSlice';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.users.filterText);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search users..."
        value={filterText}
        onChange={(e) => dispatch(setFilterText(e.target.value))}
      />
    </div>
  );
};

export default SearchFilter;

import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import { v4 as uuidv4 } from "uuid";
import { MdLogout } from "react-icons/md";
import { isAuthenticated, logout } from "../../middlewares/authentication";
import "./index.css";

const Home = () => {
  const [bindassdealData, setBindassdealData] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(-1);
  const [returnToLogin, setReturnToLogin] = useState(false);
  const { getItem, setItem } = useLocalStorage();

  const getData = useCallback(async () => {
    const bindassdealData = JSON.parse(getItem("bindassdeal_data"));
    if (bindassdealData === null) return;
    console.log(bindassdealData);
    setBindassdealData(bindassdealData);
    setIsEditing(false);
    setEditingId(-1);
  }, [getItem]);

  useEffect(() => {
    getData();
  }, [getData]);
  const handleAdd = () => {
    const newData = {
      id: uuidv4(),
      name,
      category,
      date: formatDate(new Date()),
    };
    const updatedData = [...bindassdealData, newData];
    setItem("bindassdeal_data", updatedData);
    getData();
  };

  const handleUpdate = (id, field, value) => {
    const updatedData = bindassdealData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setBindassdealData(updatedData);
  };

  const handleDelete = (id) => {
    const filteredData = bindassdealData.filter((item) => item.id !== id);
    setItem("bindassdeal_data", filteredData);
    getData();
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditingId(id);
  };

  const handleSave = (id) => {
    const updatedData = bindassdealData.map((item) =>
      item.id === id ? { ...item } : item
    );
    setItem("bindassdeal_data", updatedData);
    getData();
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...bindassdealData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
    setBindassdealData(sortedData);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setEditingId(-1);
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFieldChange = (id, field, event) => {
    handleUpdate(id, field, event.target.value);
  };

  const handleLogout = () => {
    logout();
    setReturnToLogin(true);
  };

  // Add this function to format the date
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  if (returnToLogin || !isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const filteredData = bindassdealData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="main-heading-container">
        <h2>
          <span className="B">B</span>
          <span className="D">D</span>
        </h2>
        <h2 className="main-heading">BINDASSDEAL</h2>
        <button className="logout-button" onClick={handleLogout}>
          <MdLogout className="logout-icon" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search By Name or Category"
        value={search}
        onChange={handleSearchChange}
      />
      <button className="btn btn-dark" onClick={() => handleSort("name")}>
        Sort by Name
      </button>
      <button className="btn btn-dark" onClick={() => handleSort("category")}>
        Sort by Category
      </button>
      <button className="btn btn-dark" onClick={() => handleSort("date")}>
        Sort by Date
      </button>
      <p className="mt-2">
        Data is Sorted in {sortOrder === "asc" ? "Ascending" : "Descending"} of{" "}
        {sortField === "name" && "Name"}{" "}
        {sortField === "category" && "Category"}{" "}
        {sortField === "date" && "Date"}
      </p>
      <table>
        <thead>
          <tr>
            <th className="sno">SNo.</th>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                {isEditing && item.id === editingId ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleFieldChange(item.id, "name", e)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {isEditing && item.id === editingId ? (
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => handleFieldChange(item.id, "category", e)}
                  />
                ) : (
                  item.category
                )}
              </td>
              <td>
                {isEditing && item.id === editingId ? (
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleFieldChange(item.id, "date", e)}
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                {isEditing && item.id === editingId ? (
                  <button
                    className="btn btn-dark"
                    onClick={() => handleSave(item.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-dark"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed-bottom add-new-item-container">
        <h3>Add New Item</h3>
        <div className="add-new-item">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={handleCategoryChange}
          />
          <button onClick={handleAdd} className="btn btn-light">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

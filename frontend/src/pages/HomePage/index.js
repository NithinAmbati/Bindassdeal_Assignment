import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import { v4 as uuidv4 } from "uuid";
import { MdLogout } from "react-icons/md";
import "./index.css";
import { isAuthenticated, logout } from "../../middlewares/authentication";

class Home extends Component {
  state = {
    bindassdealData: [],
    name: "",
    category: "",
    search: "",
    sortField: "name",
    sortOrder: "asc",
    isEditing: false,
    editingId: -1,
    returnToLogin: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { getItem } = useLocalStorage();
    const bindassdealData = JSON.parse(getItem("bindassdeal_data"));
    if (bindassdealData === null) return;
    console.log(bindassdealData);
    this.setState({
      bindassdealData: bindassdealData,
      isEditing: false,
      editingId: -1,
    });
  };

  handleAdd = () => {
    const { bindassdealData, name, category } = this.state;
    const newData = { id: uuidv4(), name, category };
    const updatedData = [...bindassdealData, newData];
    const { setItem } = useLocalStorage();
    setItem("bindassdeal_data", updatedData);
    this.getData();
  };

  handleUpdate = (id, field, value) => {
    const updatedData = this.state.bindassdealData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    this.setState({ bindassdealData: updatedData });
  };

  handleDelete = (id) => {
    const filteredData = this.state.bindassdealData.filter(
      (item) => item.id !== id
    );
    const { setItem } = useLocalStorage();
    setItem("bindassdeal_data", filteredData);
    this.getData();
  };

  handleEdit = (id) => {
    this.setState({ isEditing: true, editingId: id });
  };

  handleSave = (id, field, value) => {
    const updatedData = this.state.bindassdealData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    const { setItem } = useLocalStorage();
    setItem("bindassdeal_data", updatedData);
    this.getData();
  };

  handleSort = (field) => {
    const { sortOrder, bindassdealData } = this.state;
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...bindassdealData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    this.setState({
      sortField: field,
      sortOrder: order,
      bindassdealData: sortedData,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
      editingId: -1,
      isEditing: false,
    });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleFieldChange = (id, field, event) => {
    this.handleUpdate(id, field, event.target.value);
  };

  handleLogout = () => {
    logout();
    this.setState({ returnToLogin: true }); // Set returnToLogin to true on successful logout
  };

  render() {
    const { returnToLogin } = this.state;
    if (returnToLogin || !isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    const {
      bindassdealData,
      name,
      category,
      search,
      sortOrder,
      sortField,
      isEditing,
      editingId,
    } = this.state;

    const filteredData = bindassdealData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="main-container">
        <div className="main-heading-container">
          <h2 className="btn">{""}</h2>
          <h2 className="main-heading">BINDASSDEAL</h2>
          <button className="logout-button" onClick={this.handleLogout}>
            <MdLogout className="logout-icon" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search By Name or Category"
          value={search}
          onChange={this.handleSearchChange}
        />
        <button
          className="btn btn-dark"
          onClick={() => this.handleSort("name")}
        >
          Sort by Name
        </button>
        <button
          className="btn btn-dark"
          onClick={() => this.handleSort("category")}
        >
          Sort by Category
        </button>
        <p className="mt-2">
          Data is Sorted in {sortOrder === "asc" ? "Ascending" : "Descending"}{" "}
          of {sortField === "name" ? "Name" : "Category"}
        </p>
        <table>
          <thead>
            <tr>
              <th className="sno">SNo.</th>
              <th>Name</th>
              <th>Category</th>
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
                      onChange={(e) =>
                        this.handleFieldChange(item.id, "name", e)
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {isEditing && item.id === this.state.editingId ? (
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) =>
                        this.handleFieldChange(item.id, "category", e)
                      }
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-dark mr-2"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  {isEditing && item.id === editingId ? (
                    <button
                      className="btn btn-dark"
                      onClick={() => this.handleSave(item.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => this.handleEdit(item.id)}
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
              onChange={this.handleNameChange}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={this.handleCategoryChange}
            />
            <button onClick={this.handleAdd} className="btn btn-light">
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

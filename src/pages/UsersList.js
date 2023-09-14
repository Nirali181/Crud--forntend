import React, { useEffect, useRef, useState } from "react";
import Input from "../Components/Input";
import "./userlist.scss";
import Button from "../Components/Button";
import Radio from "../Components/Radio";
import Table from "react-bootstrap/Table";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeStatusAction,
  DeleteUserAction,
  ExportToCSVAction,
  GetAllUsersAction,
  searchValue,
} from "../redux/slice/userSlice";
import { ToastContainer } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [inputValues, setInputValues] = useState({
    search: "",
  });
  const [sortValue, setSortValue] = useState("New");
  const getAllUsers = useSelector(
    (state) => state?.AddUserDetails?.getAllUsersData?.data
  );

  useEffect(() => {
    dispatch(searchValue(inputValues?.search));
  }, [inputValues?.search]);

  useEffect(() => {
    dispatch(
      GetAllUsersAction({
        search: inputValues?.search,
        selectedOption,
        sortValue,
      })
    );
  }, [inputValues?.search, selectedOption, sortValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [showSortValue, setShowSortValue] = useState(false);
  const sortRef = useRef();
  const options = [
    { label: "All", value: "All" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangRadioStatus = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleAddUser = () => {
    navigate("/adduser");
  };

  const handleExportToCSV = () => {
    dispatch(ExportToCSVAction()).then((result) => {
      if (result?.payload?.status === 200) {
        window.open(result?.payload?.downloadUrl, "blank");
      } else {
        console.log("error");
      }
    });
  };
  const handleSort = () => {
    setShowSortValue(!showSortValue);
  };

  const handleSortValue = (value) => {
    setSortValue(value);
    setShowSortValue(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortValue(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    console.log("iiiiii", id);
    dispatch(DeleteUserAction(id)).then((result) => {
      if (result?.payload?.status === 200) {
        dispatch(GetAllUsersAction());
      }
    });
  };

  const handleStatusChange = async (id, status) => {
    const formData = new FormData();
    status = status === "Active" ? true : false;
    formData.append("status", status);
    try {
      const result = await dispatch(ChangeStatusAction({ id, data: formData }));
      if (result?.payload?.status === 200) {
        dispatch(
          GetAllUsersAction({
            search: inputValues?.search,
            selectedOption,
            sortValue,
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="userlist-container">
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <Input
            type="text"
            name="search"
            value={inputValues?.search}
            onChange={handleChange}
            className="p-1 mx-4 search-bar"
          />
          <Button
            type="submit"
            children="Add User"
            onClick={handleAddUser}
            className="mx-5 add-btn"
          />
        </div>
        <div className="d-flex filter-container">
          <div className="mt-3 export-file">
            <Button
              type="submit"
              children="Export to CSV"
              onClick={handleExportToCSV}
              className="my-4 mx-4 export-csv"
            />
          </div>
          <div className="mt-3 gender-filter">
            <p className="my-2 mx-3 mt-4">Filter By Gender</p>
            <Radio
              type="radio"
              options={options}
              selectedValue={selectedOption}
              onChange={handleRadioChange}
              className="mx-2"
            />
          </div>
          <div className="mt-5 sort-container" ref={sortRef}>
            <p className="mx-3">Sort By Value</p>
            <i
              className="fa fa-sort"
              aria-hidden="true"
              onClick={handleSort}
            ></i>
            {showSortValue ? (
              <div className="sort-data">
                <div
                  onClick={() => handleSortValue("New")}
                  className={sortValue === "New" ? "sort-value" : ""}
                >
                  New
                </div>
                <div
                  onClick={() => handleSortValue("Old")}
                  className={sortValue === "Old" ? "sort-value" : ""}
                >
                  Old
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <div className="mt-3 gender-filter">
            <p className="my-2 mx-3 mt-4">Filter By Status</p>
            <Radio
              type="radio"
              options={statusOptions}
              selectedValue={selectedStatus}
              onChange={handleChangRadioStatus}
              className="mx-2"
            />
          </div> */}
        </div>
        {/* Table */}
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllUsers?.map((val, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{val?.firstName + " " + val?.lastName}</td>
                    <td>{val?.email}</td>
                    <td>{val?.gender}</td>
                    <td>
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          id="dropdown-basic"
                        >
                          {val.status === true ? "Active" : "InActive"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(val._id, "Active")
                            }
                          >
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(val._id, "InActive")
                            }
                          >
                            InActive
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>{val?.location}</td>
                    <td className="d-flex justify-content-around align-items-center">
                      <NavLink to={`/edituser/${val?._id}`}>
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </NavLink>

                      <NavLink to={`/viewuser/${val?._id}`}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </NavLink>

                      <div onClick={() => handleDelete(val?._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default UsersList;

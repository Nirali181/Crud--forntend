import React, { useState } from "react";
import Input from "../Components/Input";
import "./adduser.scss";
import Radio from "../Components/Radio";
import Button from "../Components/Button";
import { useDispatch } from "react-redux";
import { AddUserAction } from "../redux/slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [formDataErrors, setFormDataErrors] = useState({});
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("Active");
  const [profile, setProfile] = useState(null);
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const validate = () => {
    let errors = {};

    if (!inputValues.firstName) {
      errors.firstName = "FirstName is required";
    }
    if (!inputValues.lastName) {
      errors.lastName = "LastName is required";
    }
    if (!inputValues.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        inputValues.email
      )
    ) {
      errors.email = "Email is invalid";
    }
    if (!inputValues.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(inputValues?.mobile)) {
      errors.mobile = "Mobile number contains only 10 digits";
    }
    if (!gender) {
      errors.gender = "Please select gender";
    }
    if (!status) {
      errors.status = "Please select Status";
    }
    if (!profile) {
      errors.profile = "Profile is required";
    }
    if (!inputValues.location) {
      errors.location = "Location is required";
    }
    setFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("firstName", inputValues?.firstName);
      formData.append("lastName", inputValues?.lastName);
      formData.append("email", inputValues?.email);
      formData.append("mobile", inputValues?.mobile);
      formData.append("gender", gender);
      formData.append("status", status === "Active" ? true :false);
      formData.append("profile", profile);
      formData.append("location", inputValues?.location);
      dispatch(AddUserAction(formData)).then((result) => {
        if (result?.payload?.status === 201) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      });
    }
  };

  return (
    <div className="adduser-container mt-4">
      <h3 className="heading-container">Register Your Details</h3>
      <div className="mt-4 d-flex justify-content-around align-items-center">
        <div className="">
          <label>First Name</label>
          <Input
            type="text"
            name="firstName"
            value={inputValues?.firstName}
            onChange={handleChange}
            placeholder="Enter firstName"
            className="input-field"
          />
          {formDataErrors && <p>{formDataErrors?.firstName}</p>}
        </div>
        <div className="">
          <div>
            <label>Last Name</label>
          </div>
          <Input
            type="text"
            name="lastName"
            value={inputValues?.lastName}
            onChange={handleChange}
            placeholder="Enter Lastname"
            className="input-field"
          />
          {formDataErrors && <p>{formDataErrors?.lastName}</p>}
        </div>
      </div>

      {/* Email Phone */}
      <div className="d-flex justify-content-around align-items-center">
        <div className="">
          <div>
            <label>Email</label>
          </div>
          <Input
            type="text"
            name="email"
            value={inputValues?.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="input-field"
          />
          {formDataErrors && <p>{formDataErrors?.email}</p>}
        </div>
        <div className="">
          <div>
            <label>Mobile</label>
          </div>
          <Input
            type="text"
            name="mobile"
            value={inputValues?.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile"
            className="input-field"
          />
          {formDataErrors && <p>{formDataErrors?.mobile}</p>}
        </div>
      </div>

      {/* select gender */}

      <div className="d-flex justify-content-around align-items-center">
        <div>
          <label>Select Your Gender</label>
          <Radio
            type="radio"
            options={genderOptions}
            selectedValue={gender}
            onChange={handleGender}
            className="mx-2"
          />
          {formDataErrors && <p>{formDataErrors?.gender}</p>}
        </div>

        <div className="">
          <label className="status-label">Status</label>
          <select name="status" value={status} onChange={handleStatus} className="dropdown-container">
            <option value="Active">Active</option>
            <option value="In-Active">In-Active</option>
          </select>
          {formDataErrors && <p>{formDataErrors?.status}</p>}
        </div>
      </div>
      {/* select profile */}
      <div className="d-flex justify-content-around align-items-center mx-5">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Select Your Profile</label>
          <input type="file" name="profile" onChange={handleProfile} />
          {formDataErrors && <p>{formDataErrors?.profile}</p>}
        </div>
        <div className="">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Location</label>
            <input type="text" name="location" onChange={handleChange} value={inputValues?.location} className="input-field" placeholder="Enter Location"/>
            {formDataErrors && <p>{formDataErrors?.location}</p>}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button children="Submit" type="submit" onClick={handleSubmit} className="submit-btn" />
      </div>
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
  );
};

export default AddUser;

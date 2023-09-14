import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Radio from "../Components/Radio";
import { ToastContainer } from "react-toastify";
import Button from "../Components/Button";
import "./adduser.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EditSingleUserAction,
  GetSingleUserAction,
} from "../redux/slice/userSlice";

const EditUser = () => {
  const getSingleUser = useSelector(
    (state) => state?.AddUserDetails?.getSingleUser?.data
  );
  const [formDataErrors, setFormDataErrors] = useState({});
  const [formDataState, setFormDataState] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  useEffect(() => {
    dispatch(GetSingleUserAction(id));
  }, [id]);
  useEffect(() => {
    if (getSingleUser) {
      setFormDataState(getSingleUser);
      setSelectedGender(getSingleUser?.gender);
      setStatus(getSingleUser?.status === true ? "Active" : "In-Active");
      setProfile(getSingleUser?.profile);
    }
  }, [getSingleUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handleGender = (e) => {
    setSelectedGender(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const validate = () => {
    let errors = {};

    if (!formDataState?.firstName) {
      errors.firstName = "First name is required";
    }
    if (!formDataState?.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!formDataState?.email) {
      errors.email = "Email is required";
    }
    if (!formDataState?.mobile) {
      errors.mobile = "Mobile is required";
    }
    if (!selectedGender) {
      errors.selectedGender = "Gender is required";
    }
    if (!status) {
      errors.status = "Status is required";
    }
    setFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  console.log("1234",status)
  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("firstName", formDataState?.firstName);
      formData.append("lastName", formDataState?.lastName);
      formData.append("email", formDataState?.email);
      formData.append("mobile", formDataState?.mobile);
      formData.append("gender", selectedGender);
      formData.append("status", status === "Active" ? true :false);
      formData.append("profile", profile);
      formData.append("location", formDataState?.location);

      dispatch(EditSingleUserAction({ data: formData, id: id })).then(
        (result) => {
          console.log("result", result);
          if (result?.payload?.status === 200) {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        }
      );
    }
  };
  return (
    <div>
      <div className="adduser-container mt-4">
        <h3 className="heading-container">Update Your Details</h3>
        <div className="mt-4 d-flex justify-content-around align-items-center">
          <div className="">
            <label>First Name</label>
            <Input
              type="text"
              name="firstName"
              value={formDataState?.firstName}
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
              value={formDataState?.lastName}
              onChange={handleChange}
              placeholder="Enter lastName"
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
              value={formDataState?.email}
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
              value={formDataState?.mobile}
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
              selectedValue={selectedGender}
              onChange={handleGender}
              className="mx-2"
            />
            {formDataErrors && <p>{formDataErrors?.gender}</p>}
          </div>

          <div className="">
            <label className="status-label">Status</label>
            <select
              name="status"
              value={status}
              onChange={handleStatus}
              className="dropdown-container"
            >
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
            <div>{profile}</div>
            {formDataErrors && <p>{formDataErrors?.profile}</p>}
          </div>
          <div className="">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formDataState?.location}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter Location"
              />
              {formDataErrors && <p>{formDataErrors?.location}</p>}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            children="Submit"
            type="submit"
            onClick={handleSubmit}
            className="submit-btn"
          />
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
    </div>
  );
};

export default EditUser;

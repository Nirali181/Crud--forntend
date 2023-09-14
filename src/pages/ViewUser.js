import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleUserAction } from "../redux/slice/userSlice";
import "./viewuser.scss";
const ViewUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getSingleUser = useSelector(
    (state) => state?.AddUserDetails?.getSingleUser?.data
  );
  useEffect(() => {
    dispatch(GetSingleUserAction(id));
  }, [id]);
  return (
    <div className="viewuser-container mt-5">
      <div className="p-4">
        <div className="username-details">{getSingleUser?.firstName + " " + getSingleUser?.lastName}</div>
        <i class="fa fa-envelope-o" aria-hidden="true"></i> :{" "}
        {getSingleUser?.email}
        <div>
          <i class="fa fa-phone" aria-hidden="true"></i> :{" "}
          {getSingleUser?.mobile}
        </div>
        <div>
          <i class="fa fa-user" aria-hidden="true"></i> :{" "}
          {getSingleUser?.gender}
        </div>
        <div>
          <i class="fa fa-map-marker" aria-hidden="true"></i> :{" "}
          {getSingleUser?.location}
        </div>
        <div className="d-flex">
          <div>Status : {" "}</div> 
          {getSingleUser?.status}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

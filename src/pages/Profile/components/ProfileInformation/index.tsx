import React from "react";
import { useSelector } from "react-redux";
import { IMG_NOAVATAR } from "../../../../constant";

export default function ProfileInformation() {
  const user = useSelector((state: any) => state.user.data);
  console.log(user);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {user?.image ? (
                <img src={user?.image} className="user-img" alt="" />
              ) : (
                <img src={IMG_NOAVATAR} className="user-img" alt="" />
              )}
              <h4>{user?.username}</h4>
              <p>{user?.bio || "..."}</p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Edit Profile Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

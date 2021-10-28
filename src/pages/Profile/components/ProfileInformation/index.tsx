import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../..";
import { IMG_NOAVATAR } from "../../../../constant";
import { User } from "../../../../interfaces";
import { deleteFollowing, postFollowing } from "../../../Articles/apis";
import { getProfile } from "../../apis";

export default function ProfileInformation({ slug }: { slug: string }) {
  const user = useSelector((state: RootState) => state.user.data);
  const [focusUser, setFocusUser] = useState<User>();
  const history = useHistory();
  const token = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    getProfile(token, slug).then((res) => {
      setFocusUser(res.data.profile);
    });
  }, [slug, token]);

  const handleClickEdit = () => {
    history.push("/settings");
  };

  const handleFollow = () => {
    if (focusUser?.following) {
      deleteFollowing(token, focusUser?.username).then((res: any) => {
        setFocusUser(res.data.profile);
      });
    } else {
      postFollowing(token, focusUser?.username).then((res: any) => {
        setFocusUser(res.data.profile);
      });
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {focusUser?.image ? (
                <img src={focusUser?.image} className="user-img" alt="" />
              ) : (
                <img src={IMG_NOAVATAR} className="user-img" alt="" />
              )}
              <h4>{focusUser?.username}</h4>
              <p>{focusUser?.bio || "..."}</p>
              {user.username !== focusUser?.username ? (
                <button
                  className={
                    !focusUser?.following
                      ? "btn btn-sm btn-outline-primary "
                      : "btn btn-sm btn-primary "
                  }
                  onClick={handleFollow}
                >
                  {focusUser?.following ? (
                    <i></i>
                  ) : (
                    <i className="ion-plus-round"></i>
                  )}
                  &nbsp;{" "}
                  {focusUser?.following
                    ? `Unfollow ${focusUser?.username}`
                    : `Follow ${focusUser?.username}`}
                  <span className="counter"></span>
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={handleClickEdit}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp; Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

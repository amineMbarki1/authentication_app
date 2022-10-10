import { FC } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import useStore from "../../store";
import Logout from "../../auth/components/Logout";
import userService from "../../service/user.service";

const ProfilePage: FC = () => {
  const store = useStore();
  const { data: userDetails, isLoading } = useQuery(
    "userDetails",
    userService.getUserDetails,
    {
      onSuccess(variables) {
        store.setAuthUser(userDetails!);
      },
      onError(error: any) {
        toast.error("Failed to load user details");
      },
    }
  );

  // TODO: Better Loading indicator
  if (isLoading) return <h3>Loading ...</h3>;

  return (
    <main>
      <section style={{ flexDirection: "column" }}>
        <header>
          <h1>Perosonal Info</h1>
          <p>Basic Info like your name and photo ...</p>
          <Logout />
        </header>
        <div
          style={{
            maxWidth: 800,
            width: "80%",
            margin: "0 auto",
            border: "1px solid #eee",
            borderRadius: 5,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3>Profile</h3>
              <p>Some info may be visible by othe people</p>
            </div>

            <Link to="profile/edit">
              <i>Edit</i>
            </Link>
          </div>
          <hr />
          {userDetails && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>PHOTO</p>
                <img
                  style={{ width: 100 }}
                  src="https://newsfeed.time.com/wp-content/uploads/sites/9/2010/10/homer.jpg?w=384"
                  alt="profile pic"
                />
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>NAME</p>
                <p>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>BIO</p>
                <p>{userDetails.bio ? userDetails.bio : "No bio yet :'("}</p>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>ROLE</p>
                <p>{userDetails.roles[0].name.split("_")[1]}</p>
              </div>
            </>
          )}
        </div>

        {/* <Logout /> */}
      </section>
    </main>
  );
};

export default ProfilePage;

import { FC } from "react";

import Logout from "../../auth/components/Logout";

const ProfilePage: FC = () => {
  return (
    <section>
      <h1>Hello this profile</h1>
      <Logout />
    </section>
  );
};

export default ProfilePage;

import { useQuery } from "react-query";

import EditProfile from "../components/EditProfile";
import useStore from "../../store";
import userService from "../../service/user.service";
import { UserUpdateRequest } from "../../schemas/forms.schemas";
import toast from "react-hot-toast";

const EditProfilePage = () => {
  const store = useStore();
  const { data, isLoading } = useQuery(
    "userDetails",
    userService.getUserDetails,
    {
      enabled: store.authUser === null,
      onSuccess(variables) {
        store.setAuthUser(data!);
      },
      onError() {
        toast.error("Failed to load user details");
      },
    }
  );

  const userDetails = store.authUser
    ? (store.authUser as UserUpdateRequest)
    : (data as UserUpdateRequest);

  return (
    <section>
      {isLoading && <h4>Loading ...</h4>}
      {userDetails && <EditProfile userDetails={userDetails} />}
    </section>
  );
};

export default EditProfilePage;

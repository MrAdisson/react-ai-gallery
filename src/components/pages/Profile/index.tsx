import { AuthData } from "@/auth/AuthWrapper";

const Profile = () => {
  const { user } = AuthData();
  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Here is your email: {user.email}</p>
    </div>
  );
};

export default Profile;

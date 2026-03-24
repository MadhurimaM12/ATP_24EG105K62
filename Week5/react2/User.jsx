const User = ({ name, email, image }) => {
  return (
    <div className="user-card">
      <img src={image} alt={name} className="user-image" />
      <h3 className="user-name">{name}</h3>
      <p className="user-email">{email}</p>
      <button className="profile-btn">Profile</button>
    </div>
  );
};

export default User;

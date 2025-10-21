import ProfilePic from "../img/profilePic.png";
import "./Profile.css";

export default function ProfileView({ name, weight, height, age, onEdit }) {
  return (
    <div className="profile-card">
      <img src={ProfilePic} alt="Profile" className="profile-pic" />

      <h2 className="profile-name">Name: {name}</h2>

      <div className="profile-row">
        <h3>Weight</h3>
        <h3>Height</h3>
        <h3>Age</h3>
      </div>

      <div className="profile-row">
        <p>{weight} lb</p>
        <p>{height} ft</p>
        <p>{age}</p>
      </div>

      <button type="button" onClick={onEdit} className="edit-btn">
        Edit
      </button>
    </div>
  );
}

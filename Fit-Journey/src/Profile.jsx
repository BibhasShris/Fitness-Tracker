import ProfilePic from "./img/profilePic.png";

export default function Profile({ name, age }) {
  return (
    <div>
      <img src={ProfilePic} alt="Profile" />
      <h2>{name}</h2>
      <h3>{age}</h3>
    </div>
  );
}

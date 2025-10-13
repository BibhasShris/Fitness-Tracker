import ProfilePic from "./img/profilePic.png";

export default function Profile({ name, age }) {
  return (
    <div>
      <img src={ProfilePic} alt="Profile" />
      <h2>Name: {name}</h2>
      <section>
        <h3>Age</h3>
        <p>{age}</p>
      </section>
    </div>
  );
}

import { useState, useEffect } from "react";
import ProfilePic from "../img/profilePic.png";

export default function Profile() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setName(parsed.name || "");
      setWeight(parsed.weight || "");
      setHeight(parsed.height || "");
      setAge(parsed.age || "");
    }
  }, []);

  // Handle save
  function handleSave() {
    const profileData = { name, weight, height, age };
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setIsEditing(false);
  }

  // Handle cancel — revert to saved version
  function handleCancel() {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setName(parsed.name || "");
      setWeight(parsed.weight || "");
      setHeight(parsed.height || "");
      setAge(parsed.age || "");
    }
    setIsEditing(false);
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <img src={ProfilePic} alt="Profile" width="150" />

      {isEditing ? (
        // EDIT MODE
        <form>
          <label>
            Name:
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Weight (lb):
            <input
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>

          <label>
            Height (ft):
            <input
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>

          <label>
            Age:
            <input
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <div style={{ marginTop: "10px" }}>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // VIEW MODE
        <section>
          <p>
            <strong>Name:</strong> {name || "—"}
          </p>
          <p>
            <strong>Weight:</strong> {weight ? `${weight} lb` : "—"}
          </p>
          <p>
            <strong>Height:</strong> {height ? `${height} ft` : "—"}
          </p>
          <p>
            <strong>Age:</strong> {age || "—"}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </section>
      )}
    </div>
  );
}

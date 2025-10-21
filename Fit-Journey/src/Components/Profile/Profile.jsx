import { useState, useEffect } from "react";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // prevents premature saving

  // Load saved profile data on mount
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setWeight(data.weight || "");
      setHeight(data.height || "");
      setAge(data.age || "");
    }
    setIsLoaded(true); // mark data as loaded after initialization
  }, []);

  // Save to localStorage only after initial load is done
  useEffect(() => {
    if (isLoaded) {
      const data = { name, weight, height, age };
      localStorage.setItem("profileData", JSON.stringify(data));
    }
  }, [name, weight, height, age, isLoaded]);

  // --- Editing logic ---
  const [tempName, setTempName] = useState("");
  const [tempWeight, setTempWeight] = useState("");
  const [tempHeight, setTempHeight] = useState("");
  const [tempAge, setTempAge] = useState("");

  function handleEdit() {
    setTempName(name);
    setTempWeight(weight);
    setTempHeight(height);
    setTempAge(age);
    setIsEditing(true);
  }

  function handleSave() {
    setName(tempName);
    setWeight(tempWeight);
    setHeight(tempHeight);
    setAge(tempAge);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <ProfileEdit
          tempName={tempName}
          tempWeight={tempWeight}
          tempHeight={tempHeight}
          tempAge={tempAge}
          setTempName={setTempName}
          setTempWeight={setTempWeight}
          setTempHeight={setTempHeight}
          setTempAge={setTempAge}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileView
          name={name}
          weight={weight}
          height={height}
          age={age}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

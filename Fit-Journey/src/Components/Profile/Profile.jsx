import { useState } from "react";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [tempName, setTempName] = useState(name);
  const [tempWeight, setTempWeight] = useState(weight);
  const [tempHeight, setTempHeight] = useState(height);
  const [tempAge, setTempAge] = useState(age);

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
        // Editing mode
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
        // View Mode
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

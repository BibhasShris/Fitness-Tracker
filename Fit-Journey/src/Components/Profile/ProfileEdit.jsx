export default function ProfileEdit({
  tempName,
  tempWeight,
  tempHeight,
  tempAge,
  setTempName,
  setTempWeight,
  setTempHeight,
  setTempAge,
  onSave,
  onCancel,
}) {
  return (
    <form>
      <section>
        <label>
          Name
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </label>
      </section>
      <section>
        <label>
          Weight
          <input
            type="number"
            value={tempWeight}
            onChange={(e) => setTempWeight(e.target.value)}
          />
        </label>
      </section>
      <section>
        <label>
          Height
          <input
            type="number"
            value={tempHeight}
            onChange={(e) => setTempHeight(e.target.value)}
          />
        </label>
      </section>
      <section>
        <label>
          Age
          <input
            type="number"
            value={tempAge}
            onChange={(e) => setTempAge(e.target.value)}
          />
        </label>
      </section>
      <button type="button" onClick={onSave}>
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

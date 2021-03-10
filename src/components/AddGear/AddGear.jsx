import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function AddGear({ user }) {
  const [gearToAdd, setGearToAdd] = useState(user);

  console.log(gearToAdd);

  const handleChange = (event) => {
    setGearToAdd({
      ...gearToAdd,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "EDIT_USER", payload: userProfileEdit });
    // setEditMode(!editMode);

    // need to change
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={gearToAdd.size}
          onChange={(event) => handleChange(event)}
          name="size"
        ></input>

        <input
          type="decimal"
          value={gearToAdd.price}
          onChange={(event) => handleChange(event)}
          name="price"
        ></input>

        <input
          type="text"
          value={gearToAdd.flex}
          onChange={(event) => handleChange(event)}
          name="flex"
        ></input>

        <input
          type="text"
          value={gearToAdd.style}
          onChange={(event) => handleChange(event)}
          name="style"
        ></input>
        <input
          type="text"
          value={gearToAdd.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
        ></input>
        <input
          type="text"
          value={gearToAdd.shape}
          onChange={(event) => handleChange(event)}
          name="shape"
        ></input>
        <input
          type="text"
          value={gearToAdd.gender}
          onChange={(event) => handleChange(event)}
          name="gender"
        ></input>
        <input
          type="text"
          value={gearToAdd.condition}
          onChange={(event) => handleChange(event)}
          name="condition"
        ></input>
        <input
          type="text"
          value={gearToAdd.lacing_system}
          onChange={(event) => handleChange(event)}
          name="lacing_system"
        ></input>
        <input
          type="text"
          value={gearToAdd.description}
          onChange={(event) => handleChange(event)}
          name="description"
        ></input>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddGear;

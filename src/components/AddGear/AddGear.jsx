import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AddGear({ gear }) {
  const [gearToAdd, setGearToAdd] = useState(gear);
  const user = useSelector((store) => store.user);
  console.log(gearToAdd);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event) => {
    setGearToAdd({
      ...gearToAdd,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "ADD_GEAR", payload: gearToAdd });
    console.log(gearToAdd);
    // setEditMode(!editMode);

    // need to change
  };

  const returnToGear = () => {
    console.log("returning to Gear");
    history.push("/myGear");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Size</p>
        <input
          type="text"
          value={gearToAdd?.size}
          onChange={(event) => handleChange(event)}
          name="size"
        ></input>
        <p>Price</p>
        <input
          type="decimal"
          value={gearToAdd?.price}
          onChange={(event) => handleChange(event)}
          name="price"
        ></input>
        <p>Flex</p>
        <input
          type="text"
          value={gearToAdd?.flex}
          onChange={(event) => handleChange(event)}
          name="flex"
        ></input>
        <p>Style</p>
        <input
          type="text"
          value={gearToAdd?.style}
          onChange={(event) => handleChange(event)}
          name="style"
        ></input>
        <p>Brand</p>
        <input
          type="text"
          value={gearToAdd?.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
        ></input>
        <p>Shape</p>
        <input
          type="text"
          value={gearToAdd?.shape}
          onChange={(event) => handleChange(event)}
          name="shape"
        ></input>
        <p>Gender</p>
        <input
          type="text"
          value={gearToAdd?.gender}
          onChange={(event) => handleChange(event)}
          name="gender"
        ></input>
        <p>Condition</p>
        <input
          type="text"
          value={gearToAdd?.condition}
          onChange={(event) => handleChange(event)}
          name="condition"
        ></input>
        <p>Lacing System</p>
        <input
          type="text"
          value={gearToAdd?.lacing_system}
          onChange={(event) => handleChange(event)}
          name="lacing_system"
        ></input>
        <p>Description</p>
        <input
          type="text"
          value={gearToAdd?.description}
          onChange={(event) => handleChange(event)}
          name="description"
        ></input>
      </div>
      <div>
        <button type="submit">Add</button>
        <button onClick={returnToGear}>Cancel</button>
      </div>
    </form>
  );
}

export default AddGear;

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
  //go back to gear
  const returnToGear = () => {
    console.log("returning to Gear");
    history.push("/myGear");
  };

  //one form, multiple inputs. cancel brings you back to myGear
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Size</p>
        <input
          type="text"
          value={gearToAdd?.size}
          onChange={(event) => handleChange(event)}
          name="size"
        />
        <p>Price</p>
        <input
          type="decimal"
          value={gearToAdd?.price}
          onChange={(event) => handleChange(event)}
          name="price"
        />
        <p>Flex</p>
        <input
          type="text"
          value={gearToAdd?.flex}
          onChange={(event) => handleChange(event)}
          name="flex"
        />
        <p>Style</p>
        <input
          type="text"
          value={gearToAdd?.style}
          onChange={(event) => handleChange(event)}
          name="style"
        />
        <p>Brand</p>
        <input
          type="text"
          value={gearToAdd?.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
        />
        <p>Shape</p>
        <input
          type="text"
          value={gearToAdd?.shape}
          onChange={(event) => handleChange(event)}
          name="shape"
        />
        <p>Gender</p>
        <input
          type="text"
          value={gearToAdd?.gender}
          onChange={(event) => handleChange(event)}
          name="gender"
        />
        <p>Condition</p>
        <input
          type="text"
          value={gearToAdd?.condition}
          onChange={(event) => handleChange(event)}
          name="condition"
        />
        <p>Lacing System</p>
        <input
          type="text"
          value={gearToAdd?.lacing_system}
          onChange={(event) => handleChange(event)}
          name="lacing_system"
        />
        <p>Description</p>
        <input
          type="text"
          value={gearToAdd?.description}
          onChange={(event) => handleChange(event)}
          name="description"
        />
      </div>
      <div>
        <button type="submit">Add</button>
        <button onClick={returnToGear}>Cancel</button>
      </div>
    </form>
  );
}

export default AddGear;

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./AddGear.css";

function AddGear({ gear }) {
  const [gearToAdd, setGearToAdd] = useState(gear);
  const user = useSelector((store) => store.user);
  console.log(gearToAdd);
  const dispatch = useDispatch();
  const history = useHistory();

  // selections for input fields
  const flex = ["Stiff", "Semi-stiff", "Mid", "Semi-flex", "Flex"];
  const snowboardStyle = [
    "Freestyle",
    "Freeride",
    "All-Mountain",
    "Powder",
    "Race",
    "Swallowtail",
  ];
  const skiStyle = [
    "Alpine",
    "Freeride",
    "Telemark",
    "Cross-country",
    "Freestyle",
    "Racing",
    "Powderhound Planks",
  ];
  const type = [
    "",
    "Snowboard",
    "Ski",
    "Ski Poles",
    "Gloves",
    "Jacket",
    "Snowpants",
    "Snowboard Boots",
    "Ski Boots",
  ];
  const shape = ["Directional", "Directional Twin", "Twin", "Volume Shifted"];
  const profile = ["Camber", "Camber rocker combo", "Rocker", "Reverse Camber"];
  const gender = ["Male", "Female"];
  const condition = [
    "Boneyard",
    "Heavily used",
    "Moderately used",
    "Lightly used",
    "Like new",
    "New",
  ];
  const lacing_system = ["Traditional", "Quick-pull", "BOA"];
  // if fields are null, leave them blank
  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
    // if (gear.title === undefined) {
    //   setGearToAdd({ ...gearToAdd, title: "" });
    // }
    // if (gear.type === null) {
    //   setGearToAdd({ ...gearToAdd, type: "" });
    // }
    // if (gear.size === null) {
    //   setGearToAdd({ ...gearToAdd, size: "" });
    // }
    // if (gear.flex === null) {
    //   setGearToAdd({ ...gearToAdd, flex: "" });
    // }
    // if (gear.style === null) {
    //   setGearToAdd({ ...gearToAdd, style: "" });
    // }
    // if (gear.shape === null) {
    //   setGearToAdd({ ...gearToAdd, shape: "" });
    // }
    // if (gear.gender === null) {
    //   setGearToAdd({ ...gearToAdd, gender: "" });
    // }
    // if (gear.condition === null) {
    //   setGearToAdd({ ...gearToAdd, condition: "" });
    // }
    // if (gear.lacing_system === null) {
    //   setGearToAdd({ ...gearToAdd, lacing_system: "" });
    // }
    // if (gear.profile === null) {
    //   setGearToAdd({ ...gearToAdd, profile: "" });
    // }
  }, []);
  // packs up the data for shipment
  const handleChange = (event) => {
    setGearToAdd({
      ...gearToAdd,
      [event.target.name]: event.target.value,
    });
  };
  // sends items to database
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_GEAR", payload: gearToAdd });
    console.log(gearToAdd);
    history.push("/myGear");
    // setEditMode(!editMode);
    // need to change
  };
  //go back to gear
  const returnToGear = () => {
    console.log("returning to Gear");
    history.push("/myGear");
  };

  //one form, multiple inputs. cancel brings you back to myGear
  // need inputs to actually be selects
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Title</p>
        <input
          type="text"
          value={gearToAdd?.title}
          onChange={(event) => handleChange(event)}
          name="title"
        />
        <ImageUpload gearToAdd={gearToAdd} setGearToAdd={setGearToAdd} />
        <p>Type</p>
        <select
          onChange={(event) => handleChange(event)}
          name="type"
          value={gearToAdd?.type}
          default=""
        >
          <option default="" value="" disabled>
            Choose a type
          </option>
          {type.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </select>

        <p>Flex</p>
        <select
          onChange={(event) => handleChange(event)}
          name="flex"
          value={gearToAdd?.flex}
        >
          <option value="" disabled>
            Choose a Flex
          </option>
          {flex.map((flex) => {
            return (
              <option key={flex} value={flex}>
                {flex}
              </option>
            );
          })}
        </select>
        <p>Style</p>
        <select
          onChange={(event) => handleChange(event)}
          name="snowboardStyle"
          value={gearToAdd?.style}
        >
          <option value="" disabled>
            Choose a Style
          </option>
          {snowboardStyle.map((style) => {
            return (
              <option key={style} value={style}>
                {style}
              </option>
            );
          })}
        </select>

        <p>Shape</p>
        <select
          onChange={(event) => handleChange(event)}
          name="shape"
          value={gearToAdd?.shape}
        >
          <option value="" disabled>
            Choose a Shape
          </option>
          {shape.map((shape) => {
            return (
              <option key={shape} value={shape}>
                {shape}
              </option>
            );
          })}
        </select>
        <p>Gender</p>
        <select
          onChange={(event) => handleChange(event)}
          name="gender"
          value={gearToAdd?.gender}
        >
          <option value="" disabled>
            Choose a Gender
          </option>
          {gender.map((gender) => {
            return (
              <option key={gender} value={gender}>
                {gender}
              </option>
            );
          })}
        </select>
        <p>Condition</p>
        <select
          onChange={(event) => handleChange(event)}
          name="condition"
          value={gearToAdd?.condition}
        >
          <option value="" disabled>
            Choose a Condition
          </option>
          {condition.map((condition) => {
            return (
              <option key={condition} value={condition}>
                {condition}
              </option>
            );
          })}
        </select>
        <p>Lacing System</p>
        <select
          onChange={(event) => handleChange(event)}
          name="lacing_system"
          value={gearToAdd?.lacing_system}
        >
          <option value="" disabled>
            Choose a Size
          </option>
          {lacing_system.map((lacing_system) => {
            return (
              <option key={lacing_system} value={lacing_system}>
                {lacing_system}
              </option>
            );
          })}
        </select>
        <p>Profile</p>
        <select
          onChange={(event) => handleChange(event)}
          name="profile"
          value={gearToAdd?.profile}
        >
          <option value="" disabled>
            Choose a Size
          </option>
          {profile.map((profile) => {
            return (
              <option key={profile} value={profile}>
                {profile}
              </option>
            );
          })}
        </select>
        <p>Size</p>
        <input
          type="decimal"
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
        <p>Brand</p>
        <input
          type="text"
          value={gearToAdd?.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
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

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./EditGear.css";

function EditGear() {
  const gearToEdit = useSelector((state) => state.editItem);

  console.log(gearToEdit);
  const dispatch = useDispatch();
  const history = useHistory();

  // selections for input fields
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
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

  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
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
    dispatch({ type: "EDIT_GEAR", payload: gearToEdit });
    console.log(gearToAdd);
    dispatch({ type: "FETCH_GEAR" });
    history.push("/myGear");
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
        {/* {editGear.map((gearToEdit) =>(<div></div>))} */}
        <p>Title</p>
        <input
          type="text"
          value={gearToEdit?.title}
          onChange={(event) => handleChange(event)}
          name="title"
        />
        {/* <ImageUpload gearToEdit={gearToEdit} setGearToEdit={setGearToEdit} /> */}
        <p>Size</p>
        <select
          onChange={(event) => handleChange(event)}
          name="size"
          value={gearToEdit?.size}
        >
          <option value="" disabled>
            Choose a Size
          </option>
          {size.map((size) => {
            return (
              <option key={size} value={size}>
                {size}
              </option>
            );
          })}
        </select>
        <p>Flex</p>
        <select
          onChange={(event) => handleChange(event)}
          name="flex"
          value={gearToEdit?.flex}
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
          value={gearToEdit?.style}
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
          value={gearToEdit?.shape}
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
          value={gearToEdit?.gender}
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
          name="size"
          value={gearToEdit?.condition}
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
          value={gearToEdit?.lacing_system}
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
          value={gearToEdit?.profile}
        >
          <option value="" disabled>
            Choose a Size
          </option>
          {lacing_system.map((profile) => {
            return (
              <option key={profile} value={profile}>
                {profile}
              </option>
            );
          })}
        </select>
        <p>Price</p>
        <input
          type="decimal"
          value={gearToEdit?.price}
          onChange={(event) => handleChange(event)}
          name="price"
        />
        <p>Brand</p>
        <input
          type="text"
          value={gearToEdit?.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
        />
        <p>Description</p>
        <input
          type="text"
          value={gearToEdit?.description}
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
export default EditGear;

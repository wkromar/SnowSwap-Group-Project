import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./EditGear.css";

function EditGear() {
  const gearToEdit = useSelector((state) => state.editItem);
  const [itemToEdit, setItemToEdit] = useState(gearToEdit);
  const categories = useSelector((store) => store.categories);
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
  const profile = ["Camber", "Camber Rocker Combo", "Rocker", "Reverse Camber"];
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
    setItemToEdit({
      ...itemToEdit,
      [event.target.name]: event.target.value,
    });
  };
  // sends items to database
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "CHANGE_GEAR", payload: itemToEdit });
    console.log(gearToEdit);
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
        <p>Title</p>
        <input
          type="text"
          value={itemToEdit?.title}
          onChange={(event) => handleChange(event)}
          name="title"
        />
        <ImageUpload
          itemToEdit={itemToEdit.url}
          setItemToEdit={setItemToEdit}
        />
        <p>Categories</p>
        <select
          onChange={(event) => handleChange(event)}
          name="type"
          value={gearToAdd?.type}
          default=""
        >
          <option default="" value="" disabled>
            Choose a type
          </option>
          {categories.map((categories) => {
            return (
              <option key={categories.name} value={itemToEdit.id}>
                {categories.name}
              </option>
            );
          })}
        </select>
        <p>Flex</p>
        <select
          onChange={(event) => handleChange(event)}
          name="flex"
          value={itemToEdit?.flex}
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
          name="style"
          value={itemToEdit?.style}
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
          value={itemToEdit?.shape}
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
          value={itemToEdit?.gender}
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
          value={itemToEdit?.condition}
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
          value={itemToEdit?.lacing_system}
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
          value={itemToEdit?.profile}
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
          value={itemToEdit?.size}
          onChange={(event) => handleChange(event)}
          name="size"
        />
        <p>Price</p>
        <input
          type="decimal"
          value={itemToEdit?.price}
          onChange={(event) => handleChange(event)}
          name="price"
        />
        <p>Brand</p>
        <input
          type="text"
          value={itemToEdit?.brand}
          onChange={(event) => handleChange(event)}
          name="brand"
        />
        <p>Description</p>
        <input
          type="text"
          value={itemToEdit?.description}
          onChange={(event) => handleChange(event)}
          name="description"
        />
      </div>
      <div>
        <button type="submit">Save Changes</button>
        <button onClick={returnToGear}>Cancel</button>
      </div>
    </form>
  );
}
export default EditGear;

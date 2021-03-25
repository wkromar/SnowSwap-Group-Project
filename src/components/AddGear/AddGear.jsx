import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GearTags from "../GearTags/GearTags";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./AddGear.css";

function AddGear({ gear }) {
  const [gearToAdd, setGearToAdd] = useState({ img: [] });
  const user = useSelector((store) => store.user);
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  // conditional rendering depending on the category
  const [skiOrBoard, setSkiOrBoard] = useState(false);
  const [showFlex, setShowFlex] = useState(false);
  const [style, setStyle] = useState(false);
  const [shape, setShape] = useState(false);
  const [lacing_system, setLacingSystem] = useState(false);
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState("");

  // if fields are null, leave them blank
  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);
  // packs up the data for shipment
  const handleChange = (event) => {
    setGearToAdd({
      ...gearToAdd,
      [event.target.name]: event.target.value,
    });
  };
  // dropdown render profiles. Only Select dropdowns
  // render depending on the category chosen
  const handleView = (id) => {
    if (id === "4") {
      // snowboard
      setSkiOrBoard(true);
      setShowFlex(true);
      setStyle(true);
      setShape(true);
      setProfile(true);
      setLacingSystem(false);
    } else if (id === "1") {
      // ski
      setSkiOrBoard(false);
      setShowFlex(true);
      setStyle(true);
      setShape(true);
      setProfile(true);
      setLacingSystem(false);
    } else if (id === "3") {
      // ski_boots
      setShowFlex(true);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    } else if (id === "5") {
      // snowboard_boots;
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(true);
    } else if (id === "2" || id === "6") {
      // ski_binding, snowboard_bindings
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    } else if (id === "8" || id === "7") {
      // apparel, helmet
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    }
  };
  // sends items to database
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_GEAR", payload: gearToAdd });
    history.push("/myGear");
  };
  //go back to gear
  const returnToGear = () => {
    history.push("/myGear");
  };

  const removeThumbnail = (image) => {
    const newArray = gearToAdd.img.filter((photo) => {
      if (photo !== image) {
        return image;
      }
    });
    setGearToAdd({ ...gearToAdd, img: newArray });
  };

  const fillForm = () => {
    setGearToAdd({});
  };

  //one form, multiple inputs. cancel brings you back to myGear
  return (
    <>
      <div className="swap-header">Add Gear</div>
      <form className="add-gear-form" onSubmit={handleSubmit}>
        <div className="profile-input-container">
          <div className="input-tag">Title</div>
          <input
            type="text"
            value={gearToAdd?.title}
            onChange={(event) => handleChange(event)}
            name="title"
            className="styled-input"
          />
        </div>
        <div className="uploader-thumbnails-container">
          <div className="uploader-container">
            <ImageUpload
              keyName={"multiple"}
              state={gearToAdd}
              setState={setGearToAdd}
            />
          </div>
          <div className="thumbnail-container">
            {gearToAdd?.img?.map((image, i) => {
              return (
                <div key={i} className="uploaded-photos">
                  <img src={image} onClick={() => removeThumbnail(image)} />
                </div>
              );
            })}
            <p className="smaller-text">Click image to remove.</p>
          </div>
        </div>
        <div className="conditional-input-container ">
          <div className="profile-input-container">
            <div className="input-tag">Categories</div>
            <select
              onChange={(event) => {
                setCategory(event.target.value);
                handleView(event.target.value);
                handleChange(event);
              }}
              name="type"
              value={category}
              default=""
              className="styled-input"
            >
              <option default="" value="" disabled>
                Choose an item
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.name} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          {category === "4" ? (
            <div className="profile-input-container">
              <div className="input-tag">Flex</div>
              <select
                onChange={(event) => handleChange(event)}
                name="flex"
                value={gearToAdd?.flex}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a Flex
                </option>
                {GearTags[0].map((flex) => {
                  return (
                    <option key={flex} value={flex}>
                      {flex}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {category === "4" || category === "1" ? (
            <div className="profile-input-container">
              <div className="input-tag">Style</div>
              <select
                onChange={(event) => handleChange(event)}
                name="snowboardStyle"
                value={gearToAdd?.style}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a Style
                </option>
                {GearTags[1].map((style) => {
                  return (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {category === "4" ? (
            <div className="profile-input-container">
              <div className="input-tag">Shape</div>
              <select
                onChange={(event) => handleChange(event)}
                name="shape"
                value={gearToAdd?.shape}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a Shape
                </option>
                {GearTags[3].map((shape) => {
                  return (
                    <option key={shape} value={shape}>
                      {shape}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          <div className="profile-input-container">
            <div className="input-tag">Gender</div>
            <select
              onChange={(event) => handleChange(event)}
              name="gender"
              value={gearToAdd?.gender}
              default=""
              className="styled-input"
            >
              <option default="" value="" disabled>
                Choose a Gender
              </option>
              {GearTags[5].map((gender) => {
                return (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                );
              })}
            </select>
          </div>
          {category === "4" ? (
            <div className="profile-input-container">
              <div className="input-tag">Condition</div>
              <select
                onChange={(event) => handleChange(event)}
                name="condition"
                value={gearToAdd?.condition}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a Condition
                </option>
                {GearTags[6].map((condition) => {
                  return (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {category === "5" ? (
            <div className="profile-input-container">
              <div className="input-tag">Lacing System</div>
              <select
                onChange={(event) => handleChange(event)}
                name="lacing_system"
                value={gearToAdd?.lacing_system}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a System
                </option>
                {GearTags[7].map((lacing_system) => {
                  return (
                    <option key={lacing_system} value={lacing_system}>
                      {lacing_system}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {category === "4" || category === "1" ? (
            <div className="profile-input-container">
              <div className="input-tag">Profile</div>
              <select
                onChange={(event) => handleChange(event)}
                name="profile"
                value={gearToAdd?.profile}
                default=""
                className="styled-input"
              >
                <option default="" value="" disabled>
                  Choose a Profile
                </option>
                {GearTags[4].map((profile) => {
                  return (
                    <option key={profile} value={profile}>
                      {profile}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          <div className="profile-input-container">
            <div className="input-tag">Size</div>
            <input
              type="decimal"
              value={gearToAdd?.size}
              onChange={(event) => handleChange(event)}
              name="size"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Price</div>
            <input
              type="decimal"
              value={gearToAdd?.price}
              onChange={(event) => handleChange(event)}
              name="price"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Brand</div>
            <input
              type="text"
              value={gearToAdd?.brand}
              onChange={(event) => handleChange(event)}
              name="brand"
              className="styled-input"
            />
          </div>
          <div className="textarea-container">
            <div className="modal-header white-text center">Description</div>
            <textarea
              type="text"
              value={gearToAdd?.description}
              onChange={(event) => handleChange(event)}
              name="description"
              cols="30"
              rows="10"
            />
          </div>
        </div>
        <div className="button-container">
          <button className="ss-btn" type="submit">
            Add
          </button>
          <button className="ss-btn" onClick={returnToGear}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddGear;

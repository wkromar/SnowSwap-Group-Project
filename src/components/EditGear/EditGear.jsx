import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
import './EditGear.css';
import GearTags from '../GearTags/GearTags';
import editItem from '../../redux/reducers/editItem.reducer';

function EditGear() {
  const gearToEdit = useSelector((state) => state.editItem);
  const [itemToEdit, setItemToEdit] = useState(gearToEdit);
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(categories);
  // conditional rendering depending on the category
  const [skiOrBoard, setSkiOrBoard] = useState(false);
  const [showFlex, setShowFlex] = useState(false);
  const [style, setStyle] = useState(false);
  const [shape, setShape] = useState(false);
  const [lacing_system, setLacingSystem] = useState(false);
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
    dispatch({ type: 'FETCH_CATEGORIES' });
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
    dispatch({ type: 'CHANGE_GEAR', payload: itemToEdit });
    console.log(gearToEdit);
    history.push('/myGear');
  };
  //go back to gear
  const returnToGear = () => {
    console.log('returning to Gear');
    history.push('/myGear');
  };
  // delete item
  const deleteItem = (id) => {
    let itemToDelete = id;
    console.log(itemToDelete);
    dispatch({ type: 'DELETE_ITEM', payload: itemToDelete });
  };

  const handleView = (id) => {
    if (id === '4') {
      // snowboard
      setSkiOrBoard(true);
      setShowFlex(true);
      setStyle(true);
      setShape(true);
      setProfile(true);
      setLacingSystem(false);
    } else if (id === '1') {
      // ski
      setSkiOrBoard(false);
      setShowFlex(true);
      setStyle(true);
      setShape(true);
      setProfile(true);
      setLacingSystem(false);
    } else if (id === '3') {
      // ski_boots
      setShowFlex(true);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    } else if (id === '5') {
      // snowboard_boots;
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(true);
    } else if (id === '2' || id === '6') {
      // ski_binding, snowboard_bindings
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    } else if (id === '8' || id === '7') {
      // apparel, helmet
      setShowFlex(false);
      setStyle(false);
      setShape(false);
      setProfile(false);
      setLacingSystem(false);
    }
  };

  const removeThumbnail = (img) => {
    console.log(img, itemToEdit);
    const newArray = itemToEdit?.image?.filter((url) => {
      if (url !== img) {
        return img;
      }
    });
    setItemToEdit({ ...itemToEdit, image: newArray });
  };
  //one form, multiple inputs. cancel brings you back to myGear
  return (
    <>
      <div className="swap-header">Edit Gear</div>
      <form className="add-gear-form" onSubmit={handleSubmit}>
        <div className="profile-input-container">
          <div className="input-tag">Title</div>
          <input
            type="text"
            value={itemToEdit?.title}
            onChange={(event) => handleChange(event)}
            name="title"
            className="styled-input"
          />
          </div>
          <div className="uploader-thumbnails-container">
            <div className="uploader-container">
              <ImageUpload
                itemToEdit={itemToEdit.url}
                setItemToEdit={setItemToEdit}
                keyName={'multiple'}
              />
            </div>
            <div className="thumbnail-container">
              {itemToEdit?.image?.map((image, i) => {
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
                console.log(event.target.value);
                handleChange(event);
              }}
              name="type"
              value={itemToEdit?.type}
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
          {category === '4' ? (
            <div className="profile-input-container">
            <div className="input-tag">Flex</div>
              <select
                onChange={(event) => handleChange(event)}
                name="flex"
                value={itemToEdit?.flex}
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
          {category === '4' || category === '1' ? (
            <div className="profile-input-container">
            <div className="input-tag">Style</div>
              <select
                onChange={(event) => handleChange(event)}
                name="snowboardStyle"
                value={itemToEdit?.style}
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
          {category === '4' ? (
            <div className="profile-input-container">
            <div className="input-tag">Shape</div>
              <select
                onChange={(event) => handleChange(event)}
                name="shape"
                value={itemToEdit?.shape}
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
              value={itemToEdit?.gender}
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
          {category === '4' ? (
            <div className="profile-input-container">
            <div className="input-tag">Condition</div>
              <select
                onChange={(event) => handleChange(event)}
                name="condition"
                value={itemToEdit?.condition}
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
          {category === '5' ? (
            <div className="profile-input-container">
            <div className="input-tag">Lacing System</div>
              <select
                onChange={(event) => handleChange(event)}
                name="lacing_system"
                value={itemToEdit?.lacing_system}
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
          {category === '4' || category === '1' ? (
            <div className="profile-input-container">
            <div className="input-tag">Profile</div>
              <select
                onChange={(event) => handleChange(event)}
                name="profile"
                value={itemToEdit?.profile}
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
              value={itemToEdit?.size}
              onChange={(event) => handleChange(event)}
              name="size"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Price</div>
            <input
              type="decimal"
              value={itemToEdit?.price}
              onChange={(event) => handleChange(event)}
              name="price"
              className="styled-input"
            />
          </div>
          <div className="profile-input-container">
            <div className="input-tag">Brand</div>
            <input
              type="text"
              value={itemToEdit?.brand}
              onChange={(event) => handleChange(event)}
              name="brand"
              className="styled-input"
            />
          </div>
          <div className="textarea-container">
            <div className="modal-header white-text center">Description</div>
            <textarea
              type="text"
              value={itemToEdit?.description}
              onChange={(event) => handleChange(event)}
              name="description"
              cols="30"
              rows="10"
            />
          </div>
        </div>
        <div className="button-container">
          <button className="ss-btn" type="submit">Save</button>
          <button className="ss-btn" onClick={returnToGear}>Cancel</button>
          <button className="ss-btn" onClick={() => deleteItem(itemToEdit.id)}>Delete Item</button>
        </div>
      </form>
    </>
  );
}
export default EditGear;

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
    <form onSubmit={handleSubmit}>
      <div>
        <p>Title</p>
        <input
          type="text"
          value={itemToEdit?.title}
          onChange={(event) => handleChange(event)}
          name="title"
        />
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
            Click image to remove.
          </div>
        </div>
        <p>Categories</p>
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
        {category === '4' ? (
          <div>
            <p>Flex</p>
            <select
              onChange={(event) => handleChange(event)}
              name="flex"
              value={itemToEdit?.flex}
              default=""
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
          <div>
            <p>Style</p>
            <select
              onChange={(event) => handleChange(event)}
              name="snowboardStyle"
              value={itemToEdit?.style}
              default=""
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
          <div>
            <p>Shape</p>
            <select
              onChange={(event) => handleChange(event)}
              name="shape"
              value={itemToEdit?.shape}
              default=""
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
        <p>Gender</p>
        <select
          onChange={(event) => handleChange(event)}
          name="gender"
          value={itemToEdit?.gender}
          default=""
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
        {category === '4' ? (
          <div>
            <p>Condition</p>
            <select
              onChange={(event) => handleChange(event)}
              name="condition"
              value={itemToEdit?.condition}
              default=""
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
          <div>
            <p>Lacing System</p>
            <select
              onChange={(event) => handleChange(event)}
              name="lacing_system"
              value={itemToEdit?.lacing_system}
              default=""
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
          <div>
            <p>Profile</p>
            <select
              onChange={(event) => handleChange(event)}
              name="profile"
              value={itemToEdit?.profile}
              default=""
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
        <button onClick={() => deleteItem(itemToEdit.id)}>Delete Item</button>
      </div>
    </form>
  );
}
export default EditGear;

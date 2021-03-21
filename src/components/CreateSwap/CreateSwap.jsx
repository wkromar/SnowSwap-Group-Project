import { addDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SwapItemAdmin from '../SwapItemAdmin/SwapItemAdmin';
import ImageUpload from '../ImageUpload/ImageUpload';
import './CreateSwap.css';

export default function CreateSwap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const selectedSwap = useSelector((state) => state?.selectedSwap[0]);

  const defaultState = {
    is_private: 'true',
    start_date: '',
    sell_date: '',
    stop_date: '',
    access_code: '',
    swap_name: '',
    swap_img: '',
    pre_sale_duration: '',
    sale_duration: '',
    swap_description: '',
  };

  const [swapInfo, setSwapInfo] = useState(defaultState);
  console.log(`swapInfo`, swapInfo);

  const { slug, id } = useParams();

  const history = useHistory();

  const authLevel = user.auth_level;

  const handleSwapInfo = (event) => {
    setSwapInfo({ ...swapInfo, [event.target.name]: event.target.value });
  };

  const handleRequestAccess = () => {
    dispatch({ type: 'REQUEST_UPGRADE' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (slug === 'edit') {
      dispatch({ type: 'EDIT_SWAP', payload: swapInfo });
      history.push('/profile');
    } else {
      dispatch({ type: 'CREATE_SWAP', payload: swapInfo });
      history.push('/');
    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  useEffect(() => {
    if (slug === 'edit') {
      dispatch({ type: 'FETCH_SELECTED_SWAP', payload: id });
    }
  }, []);

  const dateFormat = 'yyyy-MM-dd';
  useEffect(() => {
    if (slug === 'edit' && selectedSwap?.owner === user.id) {
      setSwapInfo({
        id: selectedSwap?.id,
        is_private: selectedSwap?.is_private.toString(),
        start_date: format(new Date(selectedSwap?.start_date), dateFormat),
        sell_date: format(new Date(selectedSwap?.sell_date), dateFormat),
        stop_date: format(new Date(selectedSwap?.stop_date), dateFormat),
        access_code: selectedSwap?.access_code,
        swap_name: selectedSwap?.name,
        swap_img: selectedSwap?.swap_img,
        swap_description: selectedSwap?.swap_description,
      });
    } else {
      //creates a random number which is converted to base36 and then the leading 0 and decimal are removed.
      setSwapInfo({
        ...swapInfo,
        access_code: Math.random().toString(36).slice(2),
      });
    }
  }, [selectedSwap]);

  const fillData = (event) => {
    event.preventDefault();
    setSwapInfo({
      ...swapInfo,
      is_private: true,
      start_date: format(new Date('2021-03-22'), dateFormat),
      sell_date: format(new Date('2021-03-29'), dateFormat),
      stop_date: format(new Date('2021-04-01'), dateFormat),
      swap_name: 'Big Mountain',
      swap_img: 'https://www.tactics.com/a/bdg5/r/snowboard-main.jpg',
      swap_description: 'A big mountain, here is our gear.',
    });
  };

  return (
    <div>
      {authLevel < 1 ? (
        <div>
          <p>You do not have authorization to create your own swap.</p>
          <button className="ss-btn" onClick={handleRequestAccess}>Request Access</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            Swap Cover Imag
            <button className="no-style-button" onClick={fillData}>
              e
            </button>
            {swapInfo.swap_img ? (
              <div>
                <img src={swapInfo.swap_img} />
                <button
                  type="button"
                  onClick={() => setSwapInfo({ ...swapInfo, swap_img: '' })}
                >
                  Change Cover Image
                </button>
              </div>
            ) : (
              <ImageUpload
                keyName={'swap_img'}
                state={swapInfo}
                setState={setSwapInfo}
              />
            )}
            <br />
            <label htmlFor="">Swap Name</label>
            <input
              name="swap_name"
              onChange={(event) => handleSwapInfo(event)}
              value={swapInfo.swap_name}
              type="text"
            />
            <textarea
              value={swapInfo.swap_description}
              onChange={(event) => handleSwapInfo(event)}
              name="swap_description"
              cols="30"
              rows="10"
            ></textarea>
            <div>
              <input
                id="public-button"
                type="radio"
                name="is_private"
                value={'false'}
                checked={swapInfo.is_private === 'false'}
                onChange={(event) => handleSwapInfo(event)}
              />
              <label htmlFor="public-button">Public</label>
              <input
                id="private-button"
                type="radio"
                name="is_private"
                value={'true'}
                checked={swapInfo.is_private === 'true'}
                onChange={(event) => handleSwapInfo(event)}
              />
              <label htmlFor="private-button">Private</label>
            </div>
            <label>
              Start Date
              <div className="tool-tip">
                <img src="images/tooltip.svg" alt="" />
                <span className="tool-tip-text">
                  Start date is the day the swap will start it's pre-sale stage.
                  During this time users will be able to add their items to the
                  swap. No buying will occur during this stage
                </span>
              </div>
              <input
                onChange={(event) => handleSwapInfo(event)}
                value={swapInfo.start_date}
                name="start_date"
                max={swapInfo.stop_date}
                required
                type="date"
              />
            </label>
            <br />
            <label>
              Start Sale Date
              <div className="tool-tip">
                <img src="images/tooltip.svg" alt="" />
                <span className="tool-tip-text">
                  Start Sale Date is the day the swap enters it's sale stage.
                  During this time items can still be added, users are able to
                  purchase items during this time.
                </span>
              </div>
              <input
                onChange={(event) => handleSwapInfo(event)}
                value={swapInfo.sell_date}
                name="sell_date"
                min={swapInfo.start_date}
                max={swapInfo.stop_date}
                required
                type="date"
              />
            </label>
            <br />
            <label>
              Stop Date
              <div className="tool-tip">
                <img src="images/tooltip.svg" alt="" />
                <span className="tool-tip-text">
                  The stop date is the day the swap ends. All stages start and
                  stop at midnight. For example if you want your swap to go
                  through Sunday select Monday as your end date.
                </span>
              </div>
              <input
                onChange={(event) => handleSwapInfo(event)}
                value={swapInfo.stop_date}
                name="stop_date"
                min={swapInfo.sell_date}
                required
                type="date"
              />
            </label>
            <p>Your swap access code:</p>
            <h3>{swapInfo.access_code}</h3>
            <button type="submit">
              {slug === 'edit' ? 'Commit Changes' : 'Create Swap'}
            </button>
            <button onClick={handleCancel} type="button">
              Cancel
            </button>
          </form>
          {slug === 'edit' ? <SwapItemAdmin /> : <></>}
        </div>
      )}
    </div>
  );
}

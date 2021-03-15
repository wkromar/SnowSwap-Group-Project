import { addDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function CreateSwap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const selectedSwap = useSelector((state) => state.selectedSwap);
  console.log(`selectedSwap`, selectedSwap);

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
  };

  const [swapInfo, setSwapInfo] = useState(defaultState);

  console.log('wow', swapInfo);

  const { slug } = useParams();

  const history = useHistory();

  console.log(swapInfo);
  console.log('params', slug);

  const dateFormat = 'yyyy-MM-dd';

  const dayMath = () => {
    const startDate = new Date(swapInfo.start_date);

    const daysToAdd =
      Number(swapInfo.pre_sale_duration) + Number(swapInfo.sale_duration) + 1;

    const stopDate = format(
      addDays(new Date(startDate), daysToAdd),
      dateFormat
    );

    const sellDate = format(
      addDays(
        new Date(
          startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000
        ),
        swapInfo.pre_sale_duration
      ),
      dateFormat
    );

    setSwapInfo({
      ...swapInfo,
      stop_date: stopDate,
      sell_date: sellDate,
      start_date: format(
        new Date(
          startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000
        ),
        dateFormat
      ),
    });
  };

  const authLevel = user.auth_level;

  const handleSwapInfo = (event) => {
    setSwapInfo({ ...swapInfo, [event.target.name]: event.target.value });
  };

  const handleRequestAccess = () => {
    dispatch({ type: 'REQUEST_UPGRADE' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'CREATE_SWAP', payload: swapInfo });
  };

  const handleCancel = () => {
    history.push('/');
  };

  useEffect(() => {
    if (slug === 'edit' && selectedSwap.owner === user.id) {
      setSwapInfo({
        is_private: selectedSwap.is_private.toString(),
        start_date: format(new Date(selectedSwap.start_date), dateFormat),
        sell_date: selectedSwap.sell_date,
        stop_date: selectedSwap.stop_date,
        access_code: selectedSwap.access_code,
        swap_name: selectedSwap.name,
        swap_img: selectedSwap.swap_img,
      });
    } else {
      //creates a random number which is converted to base36 and then the leading 0 and decimal are removed.
      setSwapInfo({
        ...swapInfo,
        access_code: Math.random().toString(36).slice(2),
      });
    }
  }, []);

  useEffect(() => {
    if (swapInfo.start_date) {
      dayMath();
    }
  }, [swapInfo.start_date]);

  return (
    <div>
      {authLevel < 1 ? (
        <div>
          <p>You do not have authorization to create your own swap.</p>
          <button onClick={handleRequestAccess}>Request Access</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          Swap Cover Image
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
            Pre-Sale Duration
            <input
              onChange={(event) => handleSwapInfo(event)}
              value={swapInfo.pre_sale_duration}
              name="pre_sale_duration"
              required
              type="number"
            />
          </label>
          <br />
          <label>
            Sale Duration
            <input
              onChange={(event) => handleSwapInfo(event)}
              value={swapInfo.sale_duration}
              name="sale_duration"
              required
              type="number"
            />
          </label>
          <br />
          <label>
            Start Date
            <input
              onChange={(event) => handleSwapInfo(event)}
              value={swapInfo.start_date}
              name="start_date"
              required
              type="date"
            />
          </label>
          <p>Your swap access code:</p>
          <h3>{swapInfo.access_code}</h3>
          <button type="submit">Create Swap</button>
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

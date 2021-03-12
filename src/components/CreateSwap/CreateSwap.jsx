import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDays, format, addDays } from 'date-fns';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function CreateSwap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [swapInfo, setSwapInfo] = useState({
    is_private: 'true',
    start_date: '',
    sell_date: '',
    stop_date: '',
    access_code: '',
    swap_name: '',
    swap_img: '',
  });

  console.log(swapInfo);

  const [dayMathObj, setDayMathObj] = useState({
    preSale: '',
    sale: '',
    startDate: '',
  });

  const dayMath = () => {
    console.log(
      'start',
      dayMathObj.startDate,
      'pre',
      dayMathObj.preSale,
      'sale',
      dayMathObj.sale
    );

    console.log('!!!', dayMathObj.startDate);

    const dateFormat = 'MM/dd/yyyy';

    const startDate = new Date(dayMathObj.startDate);

    const daysToAdd = Number(dayMathObj.preSale) + Number(dayMathObj.sale) + 1;

    const stopDate = format(
      addDays(new Date(startDate), daysToAdd),
      dateFormat
    );

    const sellDate = format(
      addDays(
        new Date(
          startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000
        ),
        dayMathObj.preSale
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

  console.log(authLevel);

  const handleSwapInfo = (event) => {
    setSwapInfo({ ...swapInfo, [event.target.name]: event.target.value });
  };

  const handleDurationChange = (event) => {
    setDayMathObj({ ...dayMathObj, [event.target.name]: event.target.value });
  };

  const handleDateChange = (event) => {
    setDayMathObj({ ...dayMathObj, startDate: event });
  };

  const handleRequestAccess = () => {
    dispatch({ type: 'REQUEST_UPGRADE' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dayMath();
  };

  useEffect(() => {
    //creates a random number which is converted to base36 and then the leading 0 and decimal are removed.
    setSwapInfo({
      ...swapInfo,
      access_code: Math.random().toString(36).slice(2),
    });
  }, []);

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
          <ImageUpload
            keyName={'swap_img'}
            state={swapInfo}
            setState={setSwapInfo}
          />
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
              onChange={(event) => handleDurationChange(event)}
              value={dayMathObj.preSale}
              name="preSale"
              required
              type="number"
            />
          </label>
          <br />
          <label>
            Sale Duration
            <input
              onChange={(event) => handleDurationChange(event)}
              value={dayMathObj.sale}
              name="sale"
              required
              type="number"
            />
          </label>
          <br />
          <label>
            Start Date
            <input
              onChange={(event) => handleDateChange(event.target.value)}
              value={dayMathObj.startDate}
              required
              type="date"
            />
          </label>
          <p>Your swap access code:</p>
          <h3>{swapInfo.access_code}</h3>
          <button type="submit">Create Swap</button>
          <button type="button">Cancel</button>
        </form>
      )}
    </div>
  );
}

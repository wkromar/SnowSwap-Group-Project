import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDays, format, addDays } from 'date-fns';

export default function CreateSwap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [swapInfo, setSwapInfo] = useState({
    is_private: true,
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

  const [swapAccessCode, setSwapAccessCode] = useState('');

  const dayMath = () => {
    console.log(
      'start',
      dayMathObj.startDate,
      'pre',
      dayMathObj.preSale,
      'sale',
      dayMathObj.sale
    );

    const daysToAdd = Number(dayMathObj.preSale) + Number(dayMathObj.sale) + 1;
    console.log(daysToAdd);
    const addedDays = format(
      addDays(new Date(dayMathObj.startDate), daysToAdd),
      'MM/dd/yyyy'
    );
    console.log(addedDays);
  };

  const authLevel = user.auth_level;

  console.log(authLevel);

  const handleSwapInfo = (event) => {
    setSwapInfo({ ...swapInfo, [event.target.name]: event.target.value });
  };

  const handleRequestAccess = () => {
    dispatch({ type: 'REQUEST_UPGRADE', payload: user });
  };

  const handleDurationChange = (event) => {
    setDayMathObj({ ...dayMathObj, [event.target.name]: event.target.value });
  };

  const handleDateChange = (event) => {
    setDayMathObj({ ...dayMathObj, startDate: event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dayMath();
  };

  useEffect(() => {
    //creates a random number which is converted to base36 and then the leading 0 and decimal are removed.
    setSwapAccessCode(Math.random().toString(36).slice(2));
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
          <label htmlFor="">Swap Name</label>
          <input type="text" />
          <div>
            <input
              id="public-button"
              type="radio"
              name="is_private"
              value={!'false'}
              checked={swapInfo.is_private === false}
              onChange={(event) => handleSwapInfo(event)}
            />
            <label htmlFor="public-button">Public</label>
            <input
              id="private-button"
              type="radio"
              name="is_private"
              value={!!'true'}
              checked={swapInfo.is_private === true}
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
          <h3>{swapAccessCode}</h3>
          <button type="submit">Create Swap</button>
          <button type="button">Cancel</button>
        </form>
      )}
    </div>
  );
}

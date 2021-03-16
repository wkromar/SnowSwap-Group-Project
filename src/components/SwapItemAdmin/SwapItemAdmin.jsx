import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SwapItemAdmin({ selectedSwap }) {
  const dispatch = useDispatch();
  const swapItems = useSelector((state) => state.swapItems);

  console.log(`swapItems`, swapItems);

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_SWAP', payload: item });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_SWAP_ITEMS', payload: selectedSwap });
  }, []);
  return (
    <div>
      <br />
      <table>
        <tr>
          <th>Item</th>
          <th>Username</th>
          <th> </th>
        </tr>
        {swapItems.map((item) => {
          return (
            <tr>
              <td>{item.title}</td>
              <td>{item.username}</td>
              <td>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function SwapItemAdmin() {
  const dispatch = useDispatch();
  const swapItems = useSelector((state) => state.swapItems);

  console.log(`swapItems`, swapItems);

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_SWAP', payload: item });
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_SWAP_ITEMS', payload: id });
  }, []);
  return (
    <div className="swap-item-table-container">
      <div className="modal-header white-text" >Items In Swap</div>
      <br />
      <table>
        <tr>
          <th>Item</th>
          <th>Username</th>
          <th> </th>
        </tr>
        {swapItems.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.username}</td>
              <td>
                <button className="ss-btn" onClick={() => handleRemove(item)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

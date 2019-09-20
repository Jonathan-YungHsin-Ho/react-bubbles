import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

export default function AddColor({ colors, updateColors }) {
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', colorToAdd)
      .then(res => {
        // console.log(res.data);
        updateColors(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='add-wrap'>
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value },
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <button>add</button>
      </form>
    </div>
  );
}

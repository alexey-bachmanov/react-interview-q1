import React from 'react';
import classes from './Input.module.css';

function InputName(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={classes['container']}>
      <label htmlFor="name" className={classes['label']}>
        Name
      </label>
      <div className={classes['container-input']}>
        <input
          autoFocus
          type="text"
          name="name"
          id="name"
          value={props.name}
          onChange={handleChange}
          className={classes['input']}
        />
        {props.error && (
          <p className={classes['helper-text']}>
            This name has already been taken
          </p>
        )}
      </div>
    </div>
  );
}

export default InputName;

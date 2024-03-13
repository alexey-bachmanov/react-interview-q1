import classes from './Input.module.css';

function InputLocation(props) {
  const optionsJSX = props.options.map((opt, index) => (
    <option key={index} value={opt}>
      {opt}
    </option>
  ));

  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={classes['container']}>
      <label htmlFor="location" className={classes['label']}>
        Location
      </label>
      <select
        name="location"
        id="location"
        value={props.value}
        onChange={handleChange}
        className={classes['input']}
      >
        {optionsJSX}
      </select>
    </div>
  );
}

export default InputLocation;

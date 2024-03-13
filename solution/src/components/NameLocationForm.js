/**
 * When I'm building form components, I like to keep everything related to
 * the form state in one parent component, and handle smaller details,
 * like helper text display, in child components.
 * While we can outsource some business logic to the children, outsourcing
 * the debounce functionality of the InputName component will result in a
 * very messy codebase, and that's not ideal. Likewise with the call to
 * retrieve location options from our api.
 * We can, however, outsource a lot of code to custom hooks, which is what I
 * ended up doing here.
 */
import React, { useState } from 'react';
import InputName from './InputName';
import InputLocation from './InputLocation';
import NameLocationTable from './NameLocationTable';
import { isNameValid } from '../mock-api/apis';
import useDebouncedInput from '../hooks/useDebouncedInput';
import useOptions from '../hooks/useOptions';
import classes from './NameLocationForm.module.css';

function NameLocationForm() {
  /**
   * It's not ideal to keep each input in its own state variable, and
   * on a larger form I'd do something like:
   * const [ formState, setFormState ] = useState( { input1:'', input2:'',... } )
   * but we only have two values here, one of which has its state
   * handled by a cutom hook, so we only have one loose variable to keep track of
   */
  const [formLocation, setFormLocation] = useState('Location...');

  /**
   * In a real app, we'd keep entered names and locations somewhere more useful,
   * like a redux store (if we're only working with the data in this session)
   * or a database (if we need to store these values for later), but lacking any insight
   * into how this data will be used, I'm just keeping it as state local to the component
   */
  const [nameLocationTuples, setNameLocationTuples] = useState([]);

  // function to perform debounce search operation
  const performNameSearch = async (value) => {
    /**
     * irl implementation:
     * try {
     *  const response = await axios.get(`www.backend.com/api/endpoint?name=${props.name}`)
     *  return response.data
     * } catch (err) {
     *  return false
     * }
     * ...or something like that
     */
    // clean up the input
    const nameCleaned = value.trim();
    return await isNameValid(nameCleaned);
  };

  // use a custom hook to control state of debounced value
  const {
    inputValue: formName,
    debouncedValue: isFormNameValid,
    debounce: handleNameChange,
  } = useDebouncedInput(performNameSearch, '', 200);

  // use custom hook to get list of locations
  const { options } = useOptions('Location...');

  // computed state
  const isSubmitEnabled =
    formName !== '' && isFormNameValid && formLocation !== 'Location...';

  const handleSubmit = async (e) => {
    /**
     * irl, there would be an axios call, or a call to an api service class, or
     * a call to a redux thunk, etc.
     */
    e.preventDefault();
    // immediately check if the form is valid - prevent edge cases
    const isValid = await performNameSearch(formName);
    if (isValid) {
      setNameLocationTuples([
        ...nameLocationTuples,
        { name: formName, location: formLocation },
      ]);
    }
  };

  const handleClear = () => {
    // I assume this is supposed to clear the table, and not the form
    setNameLocationTuples([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes['form']}>
        <InputName
          name={formName}
          error={!isFormNameValid}
          onChange={(val) => handleNameChange(val)}
        />
        <InputLocation
          location={formLocation}
          options={options}
          onChange={(val) => setFormLocation(val)}
        />
        <div className={classes['button-group']}>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <button type="submit" disabled={!isSubmitEnabled}>
            Add
          </button>
        </div>
      </form>
      <NameLocationTable entries={nameLocationTuples} />
    </>
  );
}

export default NameLocationForm;

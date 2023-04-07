import { useHistory } from "react-router-dom";

const ObservationForm = ({ observation, onSubmit, onChange }) => {
  function changeHandler(event) {
    onChange(event);
  }

  function submitHandler(event) {
    onSubmit(event);
  }

  const history = useHistory();

  function cancelHandler() {
    history.push('/');
  }


const content = (
      <form onSubmit={submitHandler} className='mb-4'>
        <div className='row mb-3'>
          <div className='col-6 form-group'>
            <label className='form-label' htmlFor='latitude'>
              Latitude
            </label>
            <input
              className='form-control'
              id='latitude'
              name='latitude'
              type='number'
              max='90'
              min='-90'
              value={observation.latitude}
              onChange={changeHandler}
              required={true}
            />
            <small className='form-text text-muted'>Enter a value between -90 and 90.</small>
          </div>
          <div className='col-6'>
            <label className='form-label' htmlFor='longitude'>
              Longitude
            </label>
            <input
              className='form-control'
              id='longitude'
              name='longitude'
              type='number'
              max='180'
              min='-180'
              value={observation.longitude}
              onChange={changeHandler}
              required={true}
            />
            <small className='form-text text-muted'>Enter a value between -180 and 180.</small>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-6'>
            <label className='form-label' htmlFor='air_temperature_unit'>
              Air temperature unit
            </label>
            <select
              className='form-control'
              id='air_temperature_unit'
              name='air_temperature_unit'
              value={observation.air_temperature_unit}
              onChange={changeHandler}
              required={true}
            >
              <option value=''>Select a temperature unit option</option>
              <option value='F'>Fahrenheit</option>
              <option value='C'>Celsius</option>
            </select>
          </div>
          <div className='col-6'>
            <label className='form-label' htmlFor='air_temperature'>
              Air temperature
            </label>
            <input
              className='form-control'
              id='air_temperature'
              name='air_temperature'
              type='number'
              value={observation.air_temperature}
              onChange={changeHandler}
              required={true}
            />
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='cloudCover'>
            Sky conditions
          </label>
          <select
            className='form-control'
            id='sky_condition'
            name='sky_condition'
            value={observation.sky_condition}
            onChange={changeHandler}
            required={true}
          >
            <option value=''>Select a sky condition option</option>
            <option value='100'>Cloudless</option>
            <option value='101'>Some clouds</option>
            <option value='102'>Cloud covered</option>
            <option value='103'>Foggy</option>
            <option value='104'>Raining</option>
            <option value='106'>Snowing</option>
            <option value='108'>Hailing</option>
            <option value='109'>Thunderstorms</option>
          </select>
        </div>
        <div>
          <button type='button' className='btn btn-secondary mr-2' onClick={cancelHandler}>
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>

);

return content;

};

export default ObservationForm;
import React, { useState } from 'react';
import { createObservation, initialObservation } from '../utils/api';

import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import ObservationForm from './ObservationForm';

function ObservationCreate() {
  const [observation, setObservation] = useState({ ...initialObservation });
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandler({ target: { name, value } }) {
    setObservation((previousObservation) => ({
      ...previousObservation,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    createObservation(observation)
      .then(() => history.push('/'))
      .catch(setError);
  }

  return (
    <main>
      <h1 className='mb-3'>Create Observation</h1>
      <ErrorAlert error={error} />
      <ObservationForm observation={observation} onChange={changeHandler} onSubmit={submitHandler} />
    </main>
  );
}

export default ObservationCreate;

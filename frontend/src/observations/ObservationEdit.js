import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { initialObservation, readObservation, updateObservation } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import ObservationForm from "./ObservationForm";

function ObservationEdit() {

  const { observationId } = useParams();
  const [observation, setObservation] = useState({ ...initialObservation });
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readObservation(observationId, abortController.signal)
      .then(setObservation)
      .catch(setError);
    return () => abortController.abort();
  }, [observationId]);

  function changeHandler({ target: { name, value } }) {
    setObservation((previousObservation) => ({
      ...previousObservation,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    const abortController = new AbortController();
    updateObservation(observationId, observation, abortController.signal)
      .then(() => history.push(`/`))
      .catch(setError);
    return () => abortController.abort();

  }

  const content = (
    <>
      <h1 className="mb-3">Edit Observation</h1>
      <ErrorAlert error={error} />

      <ObservationForm observation={observation} onChange={changeHandler} onSubmit={submitHandler} />    
      </>
  );
  
  return content;

}

export default ObservationEdit;
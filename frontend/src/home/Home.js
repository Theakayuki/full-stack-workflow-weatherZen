import { useEffect, useState } from "react";
import { deleteObservation, listObservations } from "../utils/api";

import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function Home() {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    listObservations(abortController.signal).then(setObservations).catch(setError);
    return () => abortController.abort();
  }, []);

  function editTransferHandler(observationId) {
    history.push(`/observations/${observationId}/edit`);
  }

async function deleteTransferHandler(observationId) {
    if (window.confirm("Are you sure you want to delete this observation?")) {
      const abortController = new AbortController();
      await deleteObservation(observationId, abortController.signal);
      history.go(0);
    }
}

  const tableRows = observations.map((observation) => (
    <tr key={observation.observation_id}>
      <th scope="row">{observation.observation_id}</th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.created_at}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => editTransferHandler(observation.observation_id)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger ml-3" onClick={() => deleteTransferHandler(observation.observation_id)} >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Condition</th>
            <th scope="col">Created</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Home;

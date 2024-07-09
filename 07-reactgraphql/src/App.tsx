import React, { useEffect, useState } from "react";
import "./App.css";

import { useQuery, gql } from "@apollo/client";

function App() {
  const [capsules, setCapsules] = useState([]);
  const { loading, error, data } = useQuery(gql`
    {
      capsules {
        id
        dragon {
          active
          diameter {
            feet
            meters
          }
        }
      }
    }
  `);

  useEffect(() => {
    setCapsules(data.capsules);
  }, [data]);

  return (
    <div className="App">
      {capsules.map((capsule: any) => {
        return <h4>{capsule.id}</h4>;
      })}
    </div>
  );
}

export default App;

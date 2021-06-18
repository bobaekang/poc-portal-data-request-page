import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DataRequest from './DataRequest';
import {
  CreateResearchForm,
  UpdateResearchForm,
} from './DataRequest/ResearchForms';
import ReviewForm from './DataRequest/ReviewForm';
import mockData from './mockData';
import './App.css';

function App() {
  /** @type {{ cohorts: any; researcherData: any; reviewerData: any }} */
  const { cohorts, researcherData, reviewerData } = mockData;
  const parsedCohorts = cohorts.map((cohort) => ({
    ...cohort,
    filters: JSON.parse(cohort.filters),
  }));

  const [userType, setUserType] = useState('researcher');
  let user, data;
  switch (userType) {
    case 'researcher':
      user = researcherData.user;
      data = researcherData.projects;
      break;
    case 'reviewer':
      user = reviewerData.user;
      data = reviewerData.requests;
  }

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <label>
        <strong style={{ marginRight: '0.5rem' }}>User type</strong>
        <select name="userType" onChange={(e) => setUserType(e.target.value)}>
          <option value="researcher">Researcher</option>
          <option value="reviewer">Reviewer</option>
        </select>
      </label>
      <Switch>
        <Route
          path="/research-projects/:id"
          render={({ match }) => {
            if (userType === 'researcher')
              for (const project of researcherData.projects)
                if (project.id === parseInt(match.params.id))
                  return <UpdateResearchForm data={project} />;

            return <Redirect to="/" />;
          }}
        />
        <Route
          path="/research-projects"
          render={() =>
            userType === 'researcher' ? (
              <CreateResearchForm cohorts={parsedCohorts} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/:id"
          render={({ match }) => {
            if (userType === 'reviewer')
              for (const request of reviewerData.requests)
                if (request.id === parseInt(match.params.id))
                  return <ReviewForm data={request} />;

            return <Redirect to="/" />;
          }}
        />
        <Route path="/">
          <DataRequest user={user} data={data} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

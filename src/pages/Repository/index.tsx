import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

// function Dashboard() {}   -fica mais chato setar typagem da function
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return <h1>Repository: {params.repository}</h1>;
};

export default Repository;

import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi'; // Fidericons
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issues {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

// function Dashboard() {}   -fica mais chato setar typagem da function
const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issues[]>([]); // no array nao preciso usar tecnica do null.

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
      // console.log(response.data);
    });

    // OUTRA DA FORMA DE BUSCAR OS DADOS
    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([   //Promise.race   - pega aqui retornou resposta mais rapido.
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]); // Executar varias requisicoes ao mesmo tempo.

    //   console.log(repository);
    //   console.log(issues);
    // }
    // loadData();
  }, [params.repository]); //eslint-disable-line

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>

      {/* Se meu repository existir     && - ? */}
      {repository && (
        <RepositoryInfo>
          <header>
            {/* No maximo dois niveis de estilizacao. Por Exemplo header e a div que tem neste caso. */}

            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issue abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {/* ) : (
        <p>Carregando</p>
      )} */}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;

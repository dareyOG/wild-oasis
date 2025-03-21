import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  //  2. while loading, return a loading spinner
  if (isLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  // 3 redirect to the /login page when there's no authenticated user
  // if (!isAuthenticated && !isLoading) navigate('/login');

  //   4. render the app, when there's a user
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

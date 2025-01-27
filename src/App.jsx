import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: dodgerBlue;
  background-color: lightGray;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Check in!')}>Check in</Button>
        <Button onClick={() => alert('Check out!')}>Check out</Button>

        <Input type="text" placeholder="Enter your name" />
      </StyledApp>
    </>
  );
}

export default App;

import styled from 'styled-components';
import { useTheme } from '../features/Theme/useTheme';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useTheme();
  return (
    <StyledLogo>
      <Img src={`img/${isDark ? 'logo-dark.png' : 'logo-light.png'}`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

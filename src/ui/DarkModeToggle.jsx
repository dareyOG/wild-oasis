import { useTheme } from '../features/Theme/useTheme';
import ButtonIcon from './ButtonIcon';

import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

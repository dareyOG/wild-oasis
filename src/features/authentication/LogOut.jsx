import { useLogout } from './useLogout';

import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

import { HiArrowRightOnRectangle } from 'react-icons/hi2';

function LogOut() {
  const { isLoading, logOut } = useLogout();

  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default LogOut;

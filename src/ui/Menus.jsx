import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiDotsHorizontal } from 'react-icons/hi';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${props => props.position.x}px;
  top: ${props => props.position.y}px;

  z-index: 1;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClose = () => setOpenId('');

  const handleOpen = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, position, setPosition, handleClose, handleOpen }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { openId, setPosition, handleOpen, handleClose } = useContext(MenusContext);

  const handleToggle = e => {
    const rect = e.target.closest('button').getBoundingClientRect();
    // console.log(rect);
    setPosition({
      // x: Window.innerWidth - rect.x - rect.width,
      x: rect.bottom - rect.top + 50,
      y: rect.height + rect.y + 10
    });

    openId === '' || openId !== id ? handleOpen(id) : handleClose();
  };

  return (
    <StyledToggle onClick={handleToggle}>
      <HiDotsHorizontal />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position } = useContext(MenusContext);
  const { handleClose } = useContext(MenusContext);
  const ref = useOutsideClick(handleClose);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { handleClose } = useContext(MenusContext);

  const handleClick = () => {
    onClick();
    handleClose();
  };
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

import styled from 'styled-components';

import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { deleteCabin } from '../../services/apiCabins';
// import toast from 'react-hot-toast';

import CreateCabinForm from './CreateCabinForm';

import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { HiSquare2Stack, HiTrash, HiPencil } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const handleDuplicateCabin = () => {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    });
  };

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <button onClick={handleDuplicateCabin} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          {/* edit modal */}
          <Modal.Open opens={'edit'}>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name={'edit'}>
            <CreateCabinForm cabinEdit={cabin} />
          </Modal.Window>

          {/* delete modal */}
          <Modal.Open opens={'delete'}>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name={'delete'}>
            <ConfirmDelete
              resourceName={'cabin'}
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicateCabin}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

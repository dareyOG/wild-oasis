import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useBooking } from './useBooking';
import { useCheckOut } from '../check-in-out/useCheckOut';
import { useMoveBack } from '../../hooks/useMoveBack';

import BookingDataBox from './BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/spinner';

import { HiArrowUpOnSquare } from 'react-icons/hi2';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { isCheckingOut, checkOut } = useCheckOut();
  const moveBack = useMoveBack();

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver'
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
        )}

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkOut(bookingId);
            }}
            disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

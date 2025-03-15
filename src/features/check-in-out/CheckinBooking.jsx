import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { useCheckIn } from './useCheckin';

import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/spinner';
import Checkbox from '../../ui/Checkbox';

import { formatCurrency } from '../../utils/helpers';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { isCheckingIn, checkIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const optionalBreafastPrice = settings * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreafastPrice,
          totalPrice: totalPrice + optionalBreafastPrice
        }
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id={'breakfast'}
            onChange={() => {
              setAddBreakfast(add => !add);
              setConfirmedPaid(false);
            }}>
            Want to add breakfast for {formatCurrency(optionalBreafastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmedPaid(confirm => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id={'confirm'}>
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {addBreakfast
            ? `${formatCurrency(totalPrice + optionalBreafastPrice)} (${formatCurrency(
                totalPrice
              )}+${formatCurrency(optionalBreafastPrice)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

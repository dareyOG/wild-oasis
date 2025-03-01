import { useCabins } from './useCabins';

import CabinRow from '../cabins/CabinRow';

import Spinner from '../../ui/spinner';
import Table from '../../ui/Table';

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) return;

  return (
    <Table columns={' 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins.map(cabin => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

/* CabinTable.propTypes = {
  cabin: PropTypes.object.isRequired // or a more detailed shape
}; */

export default CabinTable;

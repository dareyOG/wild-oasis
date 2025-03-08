import { useSearchParams } from 'react-router-dom';
import { useCabins } from './useCabins';

import CabinRow from '../cabins/CabinRow';

import Spinner from '../../ui/spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) return;

  const filterValue = searchParams.get('discount') || 'all';
  // console.log(filterValue);

  // filter cabins based on discount
  let filteredCabins;
  if (filterValue === 'no_discount') {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  } else if (filterValue === 'with_discount') {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  } else {
    filteredCabins = cabins;
  }

  // sort cabins
  const sortBy = searchParams.get('sortBy') || '';
  const [field, order] = sortBy.split('-');
  // console.log(field, order);

  const modifier = order === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === 'name') {
      return a.name.localeCompare(b.name) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns={' 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* <Table.Body data={cabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} /> */}
        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

/* CabinTable.propTypes = {
  cabin: PropTypes.object.isRequired // or a more detailed shape
}; */

export default CabinTable;

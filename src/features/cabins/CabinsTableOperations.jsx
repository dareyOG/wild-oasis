import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinsTableOperation() {
  return (
    <TableOperations>
      {/* <Filter /> */}
      <Filter
        filterField={'discount'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'no_discount', label: 'No discount' },
          { value: 'with_discount', label: 'With discount' }
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperation;

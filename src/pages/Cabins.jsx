// import { useState } from 'react';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import Button from '../ui/Button';
// import Modal from '../ui/Modal';

import CabinTable from '../features/cabins/CabinTable';
import AddCabins from '../features/cabins/AddCabins';
// import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabins />
        {/* <Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
        {showForm && <Modal />} */}
      </Row>
    </>
  );
}

export default Cabins;

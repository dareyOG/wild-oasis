// import { useState } from 'react';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import Button from '../ui/Button';
// import Modal from '../ui/Modal';

import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinsTableOperations from '../features/cabins/CabinsTableOperations';
// import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinsTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
        {/* <Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
        {showForm && <Modal />} */}
      </Row>
    </>
  );
}

export default Cabins;

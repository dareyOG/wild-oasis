import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
  useEffect(function () {
    getCabins().then(cabins => console.log(cabins));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://kslildlatomuctqsltnc.supabase.co/storage/v1/object/public/cabins-images//cabin-001.jpg"
        alt="Placeholder"
      />
    </Row>
  );
}

export default Cabins;

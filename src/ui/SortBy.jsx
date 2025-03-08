import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  const handleSelect = e => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Select value={sortBy} options={options} type={'white'} onChange={handleSelect} />
    </div>
  );
}

export default SortBy;

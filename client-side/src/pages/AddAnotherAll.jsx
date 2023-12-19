import AddPredmet from './AddPredmet';
import AddTime from './AddTime';

export default function AddAnotherAll() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <AddTime />
            <AddPredmet />
    </div>
    
  );
};
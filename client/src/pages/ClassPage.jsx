import ClassView from '../components/ClassView';
import { useParams } from 'react-router-dom';
function ClassPage() {
  let { classId } = useParams();
  console.log('classPage classId', classId);
  return (
    <div className="Page">
      <ClassView classId={classId} />
    </div>
  );
}

export default ClassPage;

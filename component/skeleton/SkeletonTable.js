import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonTable = ({ numberOfRows, numberOfColumns }) => {
    const skeletonRows = Array.from({ length: numberOfRows }).map((_, i) => (
      <tr key={i}>
        {Array.from({ length: numberOfColumns }).map((_, j) => (
          <td key={j}><Skeleton /></td>
        ))}
      </tr>
    ));
  
    return <tbody>{skeletonRows}</tbody>;
}

export default SkeletonTable


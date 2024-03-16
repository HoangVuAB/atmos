import { usePlay } from '../../contexts/Play';
import { AsianHouse } from '../models/pages/AsianHouse';

export const PageSection = ({ ...props }) => {
  return (
    <group {...props}>
      <AsianHouse />
    </group>
  );
};

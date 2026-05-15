import FamilyList from "../components/FamilyList";
import { cohesionFamilies } from "../data/cohesion";

export default function Cohesion() {
  return (
    <FamilyList
      title="Cohesion & Style"
      subtitle="Pick a family to study and practise."
      families={cohesionFamilies}
      basePath="/grammar/cohesion"
      progressBase="cohesion"
    />
  );
}

import FamilyList from "../components/FamilyList";
import { inversionUnits } from "../data/inversion";

export default function Inversion() {
  return (
    <FamilyList
      title="Inversion"
      subtitle="Pick a type of inversion to study and practise."
      families={inversionUnits}
      basePath="/grammar/inversion"
      progressBase="inversion"
    />
  );
}

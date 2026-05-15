import FamilyList from "../components/FamilyList";
import { cleftFamilies } from "../data/cleft";

export default function Cleft() {
  return (
    <FamilyList
      title="Cleft Sentences"
      subtitle="Pick a family to study and practise."
      families={cleftFamilies}
      basePath="/grammar/cleft-sentences"
      progressBase="cleft"
    />
  );
}

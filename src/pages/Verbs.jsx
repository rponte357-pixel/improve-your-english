import FamilyList from "../components/FamilyList";
import { verbFamilies } from "../data/verbs";

export default function Verbs() {
  return (
    <FamilyList
      title="Advanced Verb Structures"
      subtitle="Pick a family to study and practise."
      families={verbFamilies}
      basePath="/grammar/verbs"
      progressBase="verbs"
    />
  );
}

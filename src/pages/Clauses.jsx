import FamilyList from "../components/FamilyList";
import { clauseFamilies } from "../data/clauses";

export default function Clauses() {
  return (
    <FamilyList
      title="Advanced Clauses"
      subtitle="Pick a family to study and practise."
      families={clauseFamilies}
      basePath="/grammar/clauses"
      progressBase="clauses"
    />
  );
}

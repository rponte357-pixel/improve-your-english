import FamilyList from "../components/FamilyList";
import { conditionalTypes } from "../data/conditionals";

export default function Conditionals() {
  return (
    <FamilyList
      title="Mixed Conditionals"
      subtitle="Pick a type to study and practise."
      families={conditionalTypes}
      basePath="/grammar/conditionals"
      progressBase="conditionals"
    />
  );
}

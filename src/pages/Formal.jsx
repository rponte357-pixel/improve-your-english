import FamilyList from "../components/FamilyList";
import { formalFamilies } from "../data/formal";

export default function Formal() {
  return (
    <FamilyList
      title="Formal & Academic English"
      subtitle="Pick a family to study and practise."
      families={formalFamilies}
      basePath="/grammar/formal"
      progressBase="formal"
    />
  );
}

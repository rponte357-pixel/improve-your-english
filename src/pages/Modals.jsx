import FamilyList from "../components/FamilyList";
import { modalFamilies } from "../data/modals";

export default function Modals() {
  return (
    <FamilyList
      title="Modal Deduction"
      subtitle="Pick a family to study and practise."
      families={modalFamilies}
      basePath="/grammar/modals"
      progressBase="modals"
    />
  );
}

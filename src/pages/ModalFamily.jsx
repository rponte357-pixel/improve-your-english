import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { modalFamilies } from "../data/modals";

export default function ModalFamily() {
  const { familyId } = useParams();
  const family = modalFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/modals" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/modals"
      backLabel="← Back to Modal Deduction"
      progressKey={`modals/${family.id}`}
    />
  );
}

import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { formalFamilies } from "../data/formal";

export default function FormalFamily() {
  const { familyId } = useParams();
  const family = formalFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/formal" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/formal"
      backLabel="← Back to Formal & Academic English"
      progressKey={`formal/${family.id}`}
    />
  );
}

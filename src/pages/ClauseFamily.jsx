import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { clauseFamilies } from "../data/clauses";

export default function ClauseFamily() {
  const { familyId } = useParams();
  const family = clauseFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/clauses" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/clauses"
      backLabel="← Back to Advanced Clauses"
      progressKey={`clauses/${family.id}`}
    />
  );
}

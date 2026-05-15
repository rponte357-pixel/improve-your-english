import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { verbFamilies } from "../data/verbs";

export default function VerbFamily() {
  const { familyId } = useParams();
  const family = verbFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/verbs" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/verbs"
      backLabel="← Back to Advanced Verb Structures"
      progressKey={`verbs/${family.id}`}
    />
  );
}

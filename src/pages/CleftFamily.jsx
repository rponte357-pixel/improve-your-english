import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { cleftFamilies } from "../data/cleft";

export default function CleftFamily() {
  const { familyId } = useParams();
  const family = cleftFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/cleft-sentences" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/cleft-sentences"
      backLabel="← Back to Cleft Sentences"
      progressKey={`cleft/${family.id}`}
    />
  );
}

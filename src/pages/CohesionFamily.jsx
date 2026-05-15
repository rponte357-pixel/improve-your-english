import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { cohesionFamilies } from "../data/cohesion";

export default function CohesionFamily() {
  const { familyId } = useParams();
  const family = cohesionFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/cohesion" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/cohesion"
      backLabel="← Back to Cohesion & Style"
      progressKey={`cohesion/${family.id}`}
    />
  );
}

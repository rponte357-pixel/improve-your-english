import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { conditionalTypes } from "../data/conditionals";

export default function ConditionalType() {
  const { typeId } = useParams();
  const family = conditionalTypes.find((t) => t.id === typeId);

  if (!family) return <Navigate to="/grammar/conditionals" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/conditionals"
      backLabel="← Back to Conditionals"
      progressKey={`conditionals/${family.id}`}
    />
  );
}

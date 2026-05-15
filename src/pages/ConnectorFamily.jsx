import { useParams, Navigate } from "react-router-dom";
import FamilyLesson from "../components/FamilyLesson";
import { connectorFamilies } from "../data/connectors";

export default function ConnectorFamily() {
  const { familyId } = useParams();
  const family = connectorFamilies.find((f) => f.id === familyId);

  if (!family) return <Navigate to="/grammar/connectors" replace />;

  return (
    <FamilyLesson
      family={family}
      backTo="/grammar/connectors"
      backLabel="← Back to Connectors"
      progressKey={`connectors/${family.id}`}
    />
  );
}

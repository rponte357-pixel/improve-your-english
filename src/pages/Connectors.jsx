import FamilyList from "../components/FamilyList";
import { connectorFamilies } from "../data/connectors";

export default function Connectors() {
  return (
    <FamilyList
      title="Connectors"
      subtitle="Pick a family to study and practise."
      families={connectorFamilies}
      basePath="/grammar/connectors"
      progressBase="connectors"
    />
  );
}

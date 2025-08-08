import dynamic from "next/dynamic";

const ReceptionDashboard = dynamic(() => import("../../components/dashboards/reception-dashboard"), { ssr: false });

export default function ReceptionPage() {
  return <ReceptionDashboard />;
}

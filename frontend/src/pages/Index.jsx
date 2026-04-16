import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { submitRTI } from "@/services/api/rtis";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RTIRegistrationForm from "@/components/RTIRegistrationForm";

const Index = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (payload) => {
    await submitRTI(payload);
    queryClient.invalidateQueries({ queryKey: ["rtis"] });
    navigate("/rti-management");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <RTIRegistrationForm onSubmit={handleSubmit} />
        </main>
      </div>
    </div>
  );
};

export default Index;

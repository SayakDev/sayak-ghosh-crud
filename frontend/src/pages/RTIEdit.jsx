import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RTIRegistrationForm from "@/components/RTIRegistrationForm";
import { fetchRTIById, updateRTI } from "@/services/api/rtis";

const RTIEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const {
    data: rti,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rti", id],
    queryFn: () => fetchRTIById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (payload) => updateRTI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rtis"] });
      navigate(`/rti-management/${id}`, {
        state: { successMessage: "RTI updated successfully." },
      });
    },
  });

  const handleSubmit = async (payload) => {
    return mutation.mutateAsync(payload);
  };

  const defaultValues = rti
    ? {
        applicantName: rti.applicantName || "",
        gender: rti.gender || "",
        contactNumber: rti.contactNumber || "",
        email: rti.email || "",
        address: rti.address || "",
        caseNumber: rti.caseNumber || "",
        subject: rti.subject || "",
        applicationMode: rti.applicationMode || "",
        dateOfReceipt: rti.dateOfReceipt
          ? new Date(rti.dateOfReceipt).toISOString().substring(0, 10)
          : "",
        description: rti.description || "",
        department: rti.department || "",
        assignedOfficer: rti.assignedOfficer || "",
        dueDate: rti.dueDate ? new Date(rti.dueDate).toISOString().substring(0, 10) : "",
        extendedDueDate: rti.extendedDueDate
          ? new Date(rti.extendedDueDate).toISOString().substring(0, 10)
          : "",
        reminderFrequency: rti.reminderFrequency || "",
        applicationFile: null,
        applicationFileName: rti.applicationFileName || "",
        attachmentFile: null,
        attachmentFileName: rti.attachmentFileName || "",
      }
    : null;

  if (isLoading || !id) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Edit RTI" subtitle="RTI Management" />
          <main className="flex-1 p-8 overflow-auto">
            <div className="bg-card border border-border rounded-lg shadow-sm p-8 text-center text-foreground">
              Loading RTI data...
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !rti) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Edit RTI" subtitle="RTI Management" />
          <main className="flex-1 p-8 overflow-auto">
            <div className="bg-card border border-border rounded-lg shadow-sm p-8 text-center text-destructive">
              {error?.message || "Unable to load RTI details."}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Edit RTI" subtitle="RTI Management" />
        <main className="flex-1 p-8 overflow-auto">
          <RTIRegistrationForm
            initialValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel="Update RTI"
            headerLabel="Edit RTI Information"
          />
        </main>
      </div>
    </div>
  );
};

export default RTIEdit;

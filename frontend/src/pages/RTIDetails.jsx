import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { fetchRTIById } from "@/services/api/rtis";

const Field = ({ label, value, className = "" }) => (
  <div className={className}>
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="text-sm text-foreground font-medium">{value}</div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-base font-bold text-foreground mb-4">{children}</h2>
);

const DocumentPreview = ({ label }) => (
  <div>
    <div className="text-xs text-muted-foreground mb-2">{label}</div>
    <div className="w-56 h-44 rounded-md border border-border bg-muted/40 overflow-hidden flex items-center justify-center">
      <div className="w-40 h-36 bg-card shadow-sm rounded-sm p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="w-6 h-2 bg-muted rounded-sm" />
          <div className="w-10 h-2 bg-brand/70 rounded-sm" />
        </div>
        <div className="h-1.5 bg-muted rounded-sm w-3/4 mt-2" />
        <div className="h-1.5 bg-muted rounded-sm w-full" />
        <div className="h-1.5 bg-muted rounded-sm w-5/6" />
        <div className="h-1.5 bg-muted rounded-sm w-2/3" />
        <div className="h-1.5 bg-muted rounded-sm w-full" />
        <div className="h-1.5 bg-muted rounded-sm w-3/5" />
        <div className="mt-auto h-3 bg-brand/80 rounded-sm w-1/2 self-end" />
      </div>
    </div>
  </div>
);

const officerLabels = {
  officer_a: "Officer A",
  officer_b: "Officer B",
  officer_c: "Officer C",
};

const RTIDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const { data: rti, isLoading, error } = useQuery({
    queryKey: ['rti', id],
    queryFn: () => fetchRTIById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="RTI Management" subtitle="RTI Management" />
          <main className="flex-1 p-8 overflow-auto">
            <div className="bg-card border border-border rounded-lg shadow-sm p-8 text-center text-foreground">
              Loading RTI details...
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
          <Header title="RTI Management" subtitle="RTI Management" />
          <main className="flex-1 p-8 overflow-auto">
            <div className="bg-card border border-border rounded-lg shadow-sm p-8 text-center text-destructive">
              {error?.message || 'Unable to load RTI details.'}
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
        <Header title="RTI Management" subtitle="RTI Management" />
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-card border border-border rounded-lg shadow-sm p-8">
            <Link
              to="/rti-management"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              RTI Registration Details
            </Link>

            {successMessage && (
              <div className="mb-6 rounded-md bg-green-100 px-4 py-3 text-sm font-medium text-green-900">
                {successMessage}
              </div>
            )}

            <section className="mb-8">
              <SectionTitle>Applicant Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                <Field label="Applicant Name" value={rti.applicantName} />
                <Field label="Gender" value={rti.gender} />
                <Field label="Contact Number" value={rti.contactNumber} />
                <Field label="Email ID" value={rti.email} />
                <Field
                  label="Address"
                  value={rti.address}
                  className="md:col-span-2"
                />
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>RTI Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                <Field label="RTI Case Number" value={rti.caseNumber} />
                <Field label="Subject" value={rti.subject} />
                <Field label="Application Mode" value={rti.applicationMode} />
                <Field label="Date of Receipt" value={new Date(rti.dateOfReceipt).toLocaleDateString('en-GB')} />
                <Field
                  label="Description"
                  className="md:col-span-2"
                  value={
                    <span className="font-medium text-foreground leading-relaxed block">
                      {rti.description || 'No description provided.'}
                    </span>
                  }
                />
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>Department Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                <Field label="Department" value={rti.department} />
                <Field label="Assigned Officer" value={rti.assignedOfficer ? officerLabels[rti.assignedOfficer] || rti.assignedOfficer : 'Not assigned'} />
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>Timeline Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                <Field label="Due Date" value={rti.dueDate ? new Date(rti.dueDate).toLocaleDateString('en-GB') : 'N/A'} />
                <Field label="Extended Due Date" value={rti.extendedDueDate ? new Date(rti.extendedDueDate).toLocaleDateString('en-GB') : 'N/A'} />
                <Field label="Reminder Frequency" value={rti.reminderFrequency} />
              </div>
            </section>

            <section>
              <SectionTitle>Uploaded Documents Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">Upload Application</div>
                    {(rti.applicationFileUrl || rti.applicationFilePath) && (
                      <a
                        href={rti.applicationFileUrl || rti.applicationFilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-brand transition flex items-center gap-1"
                        aria-label="Open image in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {rti.applicationFileUrl || rti.applicationFilePath ? (
                    <img
                      src={rti.applicationFileUrl || rti.applicationFilePath}
                      alt="Application"
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-lg border border-border bg-muted/40 flex items-center justify-center text-muted-foreground">
                      No application image available
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">Additional Attachments</div>
                    {(rti.attachmentFileUrl || rti.attachmentFilePath) && (
                      <a
                        href={rti.attachmentFileUrl || rti.attachmentFilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-brand transition flex items-center gap-1"
                        aria-label="Open image in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {rti.attachmentFileUrl || rti.attachmentFilePath ? (
                    <img
                      src={rti.attachmentFileUrl || rti.attachmentFilePath}
                      alt="Attachment"
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-lg border border-border bg-muted/40 flex items-center justify-center text-muted-foreground">
                      No attachment image available
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RTIDetails;

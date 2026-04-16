import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TextField, SelectField, NumberField, DateField } from "./FormField";
import UploadBox from "./UploadBox";
import { submitRTI } from "@/services/api/rtis";
import { validateRTIForm } from "@/utils/formValidation";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const applicationModeOptions = [
  { value: "online", label: "Online" },
  { value: "email", label: "Email" },
  { value: "postal", label: "Postal" },
  { value: "in_person", label: "In Person" },
];

const departmentOptions = [
  { value: "information", label: "Information Department" },
  { value: "revenue", label: "Revenue Department" },
  { value: "transport", label: "Transport Department" },
  { value: "education", label: "Education Department" },
];

const officerOptions = [
  { value: "officer_a", label: "Officer A" },
  { value: "officer_b", label: "Officer B" },
  { value: "officer_c", label: "Officer C" },
];

const reminderOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const initialValues = {
  applicantName: "",
  gender: "",
  contactNumber: "",
  email: "",
  address: "",
  caseNumber: "RTI/YYYY/DEPT/XXXX",
  subject: "",
  applicationMode: "",
  dateOfReceipt: "",
  description: "",
  department: "",
  assignedOfficer: "",
  dueDate: "",
  extendedDueDate: "",
  reminderFrequency: "",
  applicationFile: null,
  applicationFileName: "",
  attachmentFile: null,
  attachmentFileName: "",
};

const RTIRegistrationForm = ({
  initialValues: defaultValues = initialValues,
  onSubmit,
  submitLabel = "Submit",
  headerLabel = "RTI Registration",
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormValues(defaultValues);
    setErrors({});
    setStatus(null);
  }, [defaultValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (name, file) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateRTIForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the errors before submitting." });
      return;
    }

    setErrors({});
    setStatus(null);
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          return;
        }

        if ((key === "applicationFile" || key === "attachmentFile") && value instanceof File) {
          payload.append(key, value);
          return;
        }

        if (key !== "applicationFile" && key !== "attachmentFile") {
          payload.append(key, value);
        }
      });

      const submitAction = onSubmit || submitRTI;
      await submitAction(payload);
      setStatus({ type: "success", message: "RTI registration submitted successfully." });
      setFormValues(defaultValues);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit the form." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="bg-card rounded-lg border border-border p-8 shadow-sm" onSubmit={handleSubmit} noValidate>
      <div className="flex items-center gap-2 text-foreground font-semibold mb-6">
        <button
          type="button"
          onClick={() => navigate('/rti-management')}
          className="hover:text-brand transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span>{headerLabel}</span>
      </div>

      {status && (
        <div className={`mb-6 rounded-md px-4 py-3 ${status.type === "success" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>
          {status.message}
        </div>
      )}

      <section className="mb-8">
        <h3 className="section-title">Applicant Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <TextField
            name="applicantName"
            label="Applicant Name"
            required
            value={formValues.applicantName}
            onChange={handleChange}
            error={errors.applicantName}
          />
          <SelectField
            name="gender"
            label="Gender"
            required
            options={genderOptions}
            value={formValues.gender}
            onChange={handleChange}
            error={errors.gender}
          />
          <NumberField
            name="contactNumber"
            label="Contact Number"
            required
            placeholder="Enter contact number"
            value={formValues.contactNumber}
            onChange={handleChange}
            error={errors.contactNumber}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TextField
            name="email"
            label="Email ID"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            name="address"
            label="Address"
            value={formValues.address}
            onChange={handleChange}
            error={errors.address}
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="section-title">RTI Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <TextField
            name="caseNumber"
            label="RTI Case Number"
            required
            value={formValues.caseNumber}
            disabled
          />
          <TextField
            name="subject"
            label="Subject"
            required
            value={formValues.subject}
            onChange={handleChange}
            error={errors.subject}
          />
          <SelectField
            name="applicationMode"
            label="Application Mode"
            required
            options={applicationModeOptions}
            value={formValues.applicationMode}
            onChange={handleChange}
            error={errors.applicationMode}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DateField
            name="dateOfReceipt"
            label="Date of Receipt"
            required
            value={formValues.dateOfReceipt}
            onChange={handleChange}
            error={errors.dateOfReceipt}
          />
          <TextField
            name="description"
            label="Description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="section-title">Department Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SelectField
            name="department"
            label="Department"
            required
            options={departmentOptions}
            value={formValues.department}
            onChange={handleChange}
            error={errors.department}
          />
          <SelectField
            name="assignedOfficer"
            label="Assigned Officer"
            options={officerOptions}
            value={formValues.assignedOfficer}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="section-title">Timeline Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DateField
            name="dueDate"
            label="Due Date"
            required
            value={formValues.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
          />
          <DateField
            name="extendedDueDate"
            label="Extended Due Date"
            value={formValues.extendedDueDate}
            onChange={handleChange}
          />
          <SelectField
            name="reminderFrequency"
            label="Reminder Frequency"
            required
            options={reminderOptions}
            value={formValues.reminderFrequency}
            onChange={handleChange}
            error={errors.reminderFrequency}
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="section-title">Upload Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <UploadBox
            title="Upload Application (Image only)"
            name="applicationFile"
            file={formValues.applicationFile instanceof File ? formValues.applicationFile : null}
            previewName={formValues.applicationFileName}
            onFileChange={handleFileChange}
            error={errors.applicationFile}
          />
          <UploadBox
            title="Additional Attachment (Image only)"
            name="attachmentFile"
            file={formValues.attachmentFile instanceof File ? formValues.attachmentFile : null}
            previewName={formValues.attachmentFileName}
            onFileChange={handleFileChange}
            error={errors.attachmentFile}
          />
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          className="px-6 h-10 rounded-md bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition"
          onClick={() => setFormValues(defaultValues)}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 h-10 rounded-md bg-brand text-brand-foreground font-medium text-sm hover:bg-brand/90 transition disabled:opacity-50"
        >
          {isSubmitting ? `${submitLabel}…` : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default RTIRegistrationForm;

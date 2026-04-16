import { ChevronDown, Calendar } from "lucide-react";

const ErrorMessage = ({ message }) => (
  message ? <p className="text-sm text-destructive mt-2">{message}</p> : null
);

export const TextField = ({ label, required, placeholder = "Enter", disabled, name, value, type = "text", onChange, error }) => (
  <div>
    <label className="form-label">
      {label}
      {required && <span className="required-star">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={`form-input ${disabled ? "form-input-disabled" : ""} ${error ? "border-destructive" : ""}`}
    />
    <ErrorMessage message={error} />
  </div>
);

export const NumberField = ({ label, required, placeholder = "Enter", name, value, onChange, error }) => (
  <div>
    <label className="form-label">
      {label}
      {required && <span className="required-star">*</span>}
    </label>
    <div className="relative">
      <input
        type="tel"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input pr-8 ${error ? "border-destructive" : ""}`}
      />
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
    <ErrorMessage message={error} />
  </div>
);

export const SelectField = ({ label, required, placeholder = "Select", name, value, onChange, options = [], error }) => (
  <div>
    <label className="form-label">
      {label}
      {required && <span className="required-star">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input appearance-none pr-9 text-muted-foreground ${error ? "border-destructive" : ""}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
    <ErrorMessage message={error} />
  </div>
);

export const DateField = ({ label, required, placeholder = "Select", name, value, onChange, error }) => (
  <div>
    <label className="form-label">
      {label}
      {required && <span className="required-star">*</span>}
    </label>
    <div className="relative">
      <input
        type="date"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input pr-10 ${error ? "border-destructive" : ""}`}
      />
      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
    <ErrorMessage message={error} />
  </div>
);

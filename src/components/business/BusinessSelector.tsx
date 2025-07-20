import React from "react";
import { useBusiness } from "../../contexts/BusinessContext";

export const BusinessSelector = () => {
  const { selectedBusiness, setSelectedBusiness, businesses } = useBusiness();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const business = businesses.find((b) => b.id === e.target.value);
    if (business) {
      // שמירת הבחירה ב-localStorage
      localStorage.setItem("selectedBusinessId", business.id);
      setSelectedBusiness(business);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        בחר עסק
      </label>
      <select
        value={selectedBusiness?.id || ""}
        onChange={handleChange}
        className="p-2 border rounded bg-white text-sm"
        dir="rtl"
      >
        <option value="">-- בחר עסק --</option>
        {businesses.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      
      {selectedBusiness && (
        <div className="mt-2 text-sm text-slate-600">
          עסק נבחר: <span className="font-medium">{selectedBusiness.name}</span>
        </div>
      )}
    </div>
  );
};

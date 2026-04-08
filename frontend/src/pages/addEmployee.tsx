import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import { UserPlus } from "lucide-react";
import "./addEmployee.css";

function AddEmployee({ setActivePage, selectedEmployee, setSelectedEmployee }: any) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [managers, setManagers] = useState<any[]>([]);

  const [formData, setFormData] = useState<any>({
    active: true,
    // Step 1: Basic
    employeeId: "", firstName: "", middleName: "", lastName: "", countryCode: "+91", mobile: "",
    dob: "", bloodGroup: "", gender: "", cvUrl: "", idProofUrl: "", welcomeSent: false,

    // Step 2: Job
    designation: "", branch: "", department: "", subDepartment: "", grade: "", employeeType: "",
    zone: "", level: "", shift: "", email: "", doj: "", probationDays: "", trainingCompletionDate: "",
    permanentDate: "", sisterCompany: "", location: "", managerId: "", insuranceNo: "",
    insuranceCompany: "", insuranceExpiry: "", retirementAge: "", jobDescription: "",

    // Step 3: Contact
    whatsapp: "", altPhone: "", emergencyNumber: "", companyMobile: "", currentAddress: "",
    permanentAddress: "", personalEmail: "", facebook: "", linkedin: "", twitter: "", instagram: "",

    // Step 4: Other
    skills: "", hobbies: "", languages: "", specialSkills: "", maritalStatus: "", familyMembers: "", nationality: "",

    // Step 5: Bank
    bankHolder: "", bankName: "", bankBranch: "", accountType: "", accountNo: "", ifscCode: "", crnNo: "",
    esicNo: "", panNo: "", pfNo: "", uanNo: "", micrNo: "",

    // Step 6: Leave / Expense
    leaveGroup: "", multiLevelLeave: "", expenseApproval: ""
  });

  useEffect(() => {
    // Fetch managers for the reporting manager dropdown
    axios.get(`${API_BASE}/managers`).then(res => setManagers(res.data)).catch(console.error);

    if (selectedEmployee) {
      setFormData({
        ...formData,
        ...selectedEmployee,
        employeeId: selectedEmployee.employeeId || selectedEmployee.id || "",
        // parse social links if they were JSON
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    try {
      // Serialize social links
      const mergedData = {
        ...formData,
        socialLinks: JSON.stringify({
          facebook: formData.facebook,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          instagram: formData.instagram
        }),
        probationDays: formData.probationDays ? parseInt(formData.probationDays) : null,
        familyMembers: formData.familyMembers ? parseInt(formData.familyMembers) : null,
        retirementAge: formData.retirementAge ? parseInt(formData.retirementAge) : null,
        managerId: formData.managerId ? parseInt(formData.managerId) : null,
      };

      if (selectedEmployee) {
        const idToUpdate = selectedEmployee.employeeId || selectedEmployee.id;
        await axios.put(`${API_BASE}/employees/${idToUpdate}`, mergedData);
        setSuccess(true);
        setTimeout(() => { setSuccess(false); setSelectedEmployee(null); setActivePage("employees"); }, 1500);
      } else {
        await axios.post(`${API_BASE}/employees`, mergedData);
        setSuccess(true);
        setTimeout(() => { setSuccess(false); setActivePage("employees"); }, 2000);
      }
    } catch (err: any) {
      const apiData = err.response?.data;
      const apiMessage = apiData?.error || apiData?.message || (typeof apiData === 'string' ? apiData : JSON.stringify(apiData));
      setError(apiMessage || "Failed to save employee.");
    }
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setActivePage("employees");
      setSelectedEmployee(null);
    }
  };

  return (
    <div className="add-page">
      <h2 className="page-title">
        <UserPlus size={22} />
        {selectedEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      {/* Progress Indicator */}
      <div className="wizard-progress" style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map(s => (
          <div key={s} style={{ flex: 1, height: '6px', background: s <= step ? '#3b82f6' : '#e2e8f0', borderRadius: '4px' }} />
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (step === totalSteps) handleSubmit(); else nextStep(); }}>

        {step === 1 && (
          <div className="step-section">
            <h3>Basic Information</h3>
            <div className="grid">
              <div className="input-group"><label>Employee ID</label><input name="employeeId" value={formData.employeeId} onChange={handleChange} required disabled={!!selectedEmployee} /></div>
              <div className="input-group"><label>First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
              <div className="input-group"><label>Middle Name</label><input name="middleName" value={formData.middleName} onChange={handleChange} /></div>
              <div className="input-group"><label>Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
              <div className="input-group"><label>Country Code</label><input name="countryCode" value={formData.countryCode} onChange={handleChange} /></div>
              <div className="input-group"><label>Mobile Number</label><input name="mobile" value={formData.mobile} onChange={handleChange} required /></div>
              <div className="input-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
              <div className="input-group"><label>Blood Group</label><input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} /></div>
              <div className="input-group"><label>Gender</label><select name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
              <div className="input-group"><label>CV/Resume</label><input type="file" /></div>
              <div className="input-group"><label>ID Proof Type</label><select><option>Aadhar</option><option>Passport</option><option>Voter ID</option></select></div>
              <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" name="welcomeSent" checked={formData.welcomeSent} onChange={handleChange} />
                  Send a welcome message to the employee via WhatsApp/Email.
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-section">
            <h3>Job Information</h3>
            <div className="grid">
              <div className="input-group"><label>Designation</label><input name="designation" value={formData.designation} onChange={handleChange} /></div>
              <div className="input-group"><label>Branch</label><input name="branch" value={formData.branch} onChange={handleChange} /></div>
              <div className="input-group"><label>Department</label><input name="department" value={formData.department} onChange={handleChange} /></div>
              <div className="input-group"><label>Sub Department</label><input name="subDepartment" value={formData.subDepartment} onChange={handleChange} /></div>
              <div className="input-group"><label>Grade</label><input name="grade" value={formData.grade} onChange={handleChange} /></div>
              <div className="input-group"><label>Employee Type</label><select name="employeeType" value={formData.employeeType} onChange={handleChange}><option value="">Select</option><option>Full Time</option><option>Contract</option><option>Part Time</option></select></div>
              <div className="input-group"><label>Zone</label><input name="zone" value={formData.zone} onChange={handleChange} /></div>
              <div className="input-group"><label>Employee Level</label><input name="level" value={formData.level} onChange={handleChange} /></div>
              <div className="input-group"><label>Shift</label><input name="shift" value={formData.shift} onChange={handleChange} /></div>
              <div className="input-group"><label>Company Email ID</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
              <div className="input-group"><label>Date of Joining</label><input type="date" name="doj" value={formData.doj} onChange={handleChange} /></div>
              <div className="input-group"><label>Probation Period (Days)</label><input type="number" name="probationDays" value={formData.probationDays} onChange={handleChange} /></div>
              <div className="input-group"><label>Training Completion Date</label><input type="date" name="trainingCompletionDate" value={formData.trainingCompletionDate} onChange={handleChange} /></div>
              <div className="input-group"><label>Date of Permanent Employee</label><input type="date" name="permanentDate" value={formData.permanentDate} onChange={handleChange} /></div>
              <div className="input-group"><label>Sister Company</label><input name="sisterCompany" value={formData.sisterCompany} onChange={handleChange} /></div>
              <div className="input-group"><label>Job Location</label><input name="location" value={formData.location} onChange={handleChange} /></div>
              <div className="input-group"><label>Reporting Manager</label><select name="managerId" value={formData.managerId} onChange={handleChange}><option value="">None</option>{managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
              <div className="input-group"><label>Retirement Age</label><input type="number" name="retirementAge" value={formData.retirementAge} onChange={handleChange} /></div>
              <div className="input-group"><label>Insurance Number</label><input name="insuranceNo" value={formData.insuranceNo} onChange={handleChange} /></div>
              <div className="input-group"><label>Insurance Company</label><input name="insuranceCompany" value={formData.insuranceCompany} onChange={handleChange} /></div>
              <div className="input-group"><label>Insurance Expiry</label><input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} /></div>
              <div className="input-group" style={{ gridColumn: '1 / -1' }}><label>Job Description</label><textarea name="jobDescription" placeholder="Detailed job scope..." rows={4} value={formData.jobDescription} onChange={handleChange} style={{ width: '100%', padding: '10px' }}></textarea></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-section">
            <h3>Contact Information</h3>
            <div className="grid">
              <div className="input-group"><label>WhatsApp Number</label><input name="whatsapp" value={formData.whatsapp} onChange={handleChange} /></div>
              <div className="input-group"><label>Alt. Phone Number</label><input name="altPhone" value={formData.altPhone} onChange={handleChange} /></div>
              <div className="input-group"><label>Emergency Number</label><input name="emergencyNumber" value={formData.emergencyNumber} onChange={handleChange} /></div>
              <div className="input-group"><label>Company Mobile</label><input name="companyMobile" value={formData.companyMobile} onChange={handleChange} /></div>
              <div className="input-group"><label>Personal Email</label><input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} /></div>
              <div className="input-group" style={{ gridColumn: '1 / -1' }}><label>Current Address</label><textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} style={{ width: '100%', padding: '8px' }}></textarea></div>
              <div className="input-group" style={{ gridColumn: '1 / -1' }}><label>Permanent Address</label><textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} style={{ width: '100%', padding: '8px' }}></textarea></div>
              <div className="input-group"><label>Facebook Link</label><input name="facebook" value={formData.facebook} onChange={handleChange} /></div>
              <div className="input-group"><label>LinkedIn Link</label><input name="linkedin" value={formData.linkedin} onChange={handleChange} /></div>
              <div className="input-group"><label>X (Twitter) Link</label><input name="twitter" value={formData.twitter} onChange={handleChange} /></div>
              <div className="input-group"><label>Instagram Link</label><input name="instagram" value={formData.instagram} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-section">
            <h3>Other Information</h3>
            <div className="grid">
              <div className="input-group"><label>Professional Skills</label><input name="skills" value={formData.skills} onChange={handleChange} /></div>
              <div className="input-group"><label>Hobbies & Interests</label><input name="hobbies" value={formData.hobbies} onChange={handleChange} /></div>
              <div className="input-group"><label>Languages Known</label><input name="languages" value={formData.languages} onChange={handleChange} /></div>
              <div className="input-group"><label>Special Skills</label><input name="specialSkills" value={formData.specialSkills} onChange={handleChange} /></div>
              <div className="input-group"><label>Marital Status</label><select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}><option value="">Select</option><option>Single</option><option>Married</option></select></div>
              <div className="input-group"><label>No. of Family Members</label><input type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} /></div>
              <div className="input-group"><label>Nationality</label><input name="nationality" value={formData.nationality} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-section">
            <h3>Bank Details</h3>
            <div className="grid">
              <div className="input-group"><label>Account Holder Name</label><input name="bankHolder" value={formData.bankHolder} onChange={handleChange} /></div>
              <div className="input-group"><label>Bank Name</label><input name="bankName" value={formData.bankName} onChange={handleChange} /></div>
              <div className="input-group"><label>Branch Name</label><input name="bankBranch" value={formData.bankBranch} onChange={handleChange} /></div>
              <div className="input-group"><label>Account Type</label><select name="accountType" value={formData.accountType} onChange={handleChange}><option value="">Select</option><option>Savings</option><option>Current</option><option>Salary</option></select></div>
              <div className="input-group"><label>Account No.</label><input name="accountNo" value={formData.accountNo} onChange={handleChange} /></div>
              <div className="input-group"><label>IFSC Code</label><input name="ifscCode" value={formData.ifscCode} onChange={handleChange} /></div>
              <div className="input-group"><label>Customer Id / CRN No.</label><input name="crnNo" value={formData.crnNo} onChange={handleChange} /></div>
              <div className="input-group"><label>ESIC No.</label><input name="esicNo" value={formData.esicNo} onChange={handleChange} /></div>
              <div className="input-group"><label>PAN Card No.</label><input name="panNo" value={formData.panNo} onChange={handleChange} /></div>
              <div className="input-group"><label>PF No.</label><input name="pfNo" value={formData.pfNo} onChange={handleChange} /></div>
              <div className="input-group"><label>UAN No.</label><input name="uanNo" value={formData.uanNo} onChange={handleChange} /></div>
              <div className="input-group"><label>MICR No.</label><input name="micrNo" value={formData.micrNo} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="step-section">
            <h3>Allocations</h3>
            <div className="grid">
              <div className="input-group"><label>Leave Group</label><select name="leaveGroup" value={formData.leaveGroup} onChange={handleChange}><option>Standard</option></select></div>
              <div className="input-group"><label>Multi Level Leave Approval Group</label><select name="multiLevelLeave" value={formData.multiLevelLeave} onChange={handleChange}><option>Default</option></select></div>
              <div className="input-group"><label>Expense Multi Level Approval</label><select name="expenseApproval" value={formData.expenseApproval} onChange={handleChange}><option>Default</option></select></div>
            </div>
          </div>
        )}

        {/* Form Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '20px 0', borderTop: '1px solid #e2e8f0' }}>
          <button type="button" onClick={prevStep} style={{ padding: '10px 20px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', color: '#475569', fontWeight: '500' }}>
            {step === 1 ? "Cancel" : "Previous"}
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            {step < totalSteps ? (
              <button type="button" onClick={nextStep} style={{ padding: '10px 30px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Next
              </button>
            ) : (
              <button type="button" onClick={() => handleSubmit()} style={{ padding: '10px 30px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Finish Onboarding
              </button>
            )}
          </div>
        </div>

        {error && <div className="error" style={{ color: "red", marginTop: "10px", padding: '10px', background: '#fee2e2', borderRadius: '4px' }}>{error}</div>}
        {success && <div className="success" style={{ color: "green", marginTop: "10px", padding: '10px', background: '#dcfce7', borderRadius: '4px' }}>{selectedEmployee ? "Employee Updated Successfully ✅" : "Employee Onboarded Successfully ✅"}</div>}
      </form>
    </div>
  );
}

export default AddEmployee;
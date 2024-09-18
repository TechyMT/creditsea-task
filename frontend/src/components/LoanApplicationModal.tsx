import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoanFormData } from "@/types/loan";

interface LoanApplicationFormProps {
  onSubmit: (data: LoanFormData) => void;
}

export default function LoanApplicationForm({
  onSubmit,
}: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    loan_amount: 0,
    loan_tenure: 0,
    employment_status: "",
    reason_for_loan: "",
    employment_address1: "",
    employment_address2: "",
    termsAccepted: false,
    creditInfoDisclosure: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "loan_tenure" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: !prevState[name as keyof typeof prevState],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.creditInfoDisclosure === false ||
      formData.termsAccepted === false
    ) {
      alert("Please accept the terms and conditions.");
      return;
    }
    // Here you would typically send the data to your backend
    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">APPLY FOR A LOAN</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="full_name">
              Full name as it appears on bank account
            </Label>
            <Input
              id="fullName"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Full name as it appears on bank account"
              autoComplete="off"
              
            />
          </div>
          <div>
            <Label htmlFor="loanAmount">How much do you need?</Label>
            <Input
              type="text"
              id="loanAmount"
              name="loan_amount"
              value={formData.loan_amount ?? ""}
              onChange={handleInputChange}
              placeholder="How much do you need?"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="loanTenure">Loan tenure (in months)</Label>
            <Input
              type="number"
              id="loanTenure"
              name="loan_tenure"
              value={formData.loan_tenure ?? ""}
              onChange={handleInputChange}
              placeholder="Loan tenure (in months)"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="employmentStatus">Employment status</Label>
            <Input
              id="employmentStatus"
              name="employment_status"
              value={formData.employment_status}
              onChange={handleInputChange}
              placeholder="Employment status"
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="reasonForLoan">Reason for loan</Label>
          <Textarea
            id="reason_for_loan"
            name="reason_for_loan"
            value={formData.reason_for_loan}
            onChange={handleInputChange}
            placeholder="Reason for loan"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="employmentAddress1">Employment address</Label>
          <Input
            id="employmentAddress1"
            name="employment_address1"
            value={formData.employment_address1}
            onChange={handleInputChange}
            placeholder="Employment address"
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="employmentAddress2">
            Employment address (continued)
          </Label>
          <Input
            id="employmentAddress2"
            name="employment_address2"
            value={formData.employment_address2}
            onChange={handleInputChange}
            placeholder="Employment address"
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="termsAccepted"
              checked={formData.termsAccepted}
              onCheckedChange={() => handleCheckboxChange("termsAccepted")}
            />
            <Label htmlFor="termsAccepted">
              I have read the important information and accept that by
              completing the application I will be bound by the terms
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="creditInfoDisclosure"
              checked={formData.creditInfoDisclosure}
              onCheckedChange={() =>
                handleCheckboxChange("creditInfoDisclosure")
              }
            />
            <Label htmlFor="creditInfoDisclosure">
              Any personal and credit information obtained may be disclosed from
              time to time to other lenders, credit bureaus or other credit
              reporting agencies.
            </Label>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export interface Inspection {
  id: string;
  geography: string;
  supervisoryAuthority: string;
  unitSubsidiary: string;
  dateOfCommunication: string;
  scope: string;
  riskType: string;
  subtypeRisk: string;
  status: string;
  reportDate: string;
  inspectionResult: string;
  degree: number;
  degreeOfProcess: string;
  owner: string;
  finding: boolean;
  category: string;
  categoryCode: string;
  comments: string;
  expectedEndDate: string;
  startingDate: string;
}

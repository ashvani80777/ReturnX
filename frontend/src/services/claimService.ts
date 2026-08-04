import api from "./api";

export interface CreateClaimResponse {
  claimId: number;
  chatRoomId: string;
  message: string;
}

export interface ClaimResponse {
  id: number;
  itemId: number;
  ownerEmail: string;
  claimerEmail: string;
  chatRoomId: string;
  claimedAt: string;
}

export const createClaim = async (
  itemId: number
): Promise<CreateClaimResponse> => {
  const { data } = await api.post(`/claims/${itemId}`);
  return data;
};

export const getMyClaims = async (): Promise<ClaimResponse[]> => {
  const { data } = await api.get("/claims/my");
  return data;
};

export const getClaimById = async (
  claimId: number
): Promise<ClaimResponse> => {
  const { data } = await api.get(`/claims/${claimId}`);
  return data;
};

export const getOwnerClaims = async (): Promise<ClaimResponse[]> => {
  const { data } = await api.get("/claims/owner");
  return data;
};
export interface CreateClaimRequest {
  itemId: number;
}

export interface ClaimResponse {
  id: number;
  itemId: number;
  claimantEmail: string;
  ownerEmail: string;
  chatRoomId: number;
  createdAt: string;
}
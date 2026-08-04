export interface CreateClaimRequest {
  itemId: number;
}

export interface ClaimResponse {
  id: number;
  itemId: number;
  ownerEmail: string;
  claimerEmail: string; 
  chatRoomId: string;  
  claimedAt: string;
}
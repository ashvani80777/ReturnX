import api from "./api";

export interface RewardSummary {
  totalPoints: number;
  totalRewards: number;
  badge: string;
}

export interface LeaderboardUser {
  userEmail: string;
  totalPoints: number;
}

export const getMyRewardSummary = async (): Promise<RewardSummary> => {
  const { data } = await api.get<RewardSummary>("/rewards/me/summary");
  return data;
};

export const getLeaderboard = async (): Promise<LeaderboardUser[]> => {
  const { data } = await api.get<LeaderboardUser[]>("/rewards/leaderboard");
  return data;
};
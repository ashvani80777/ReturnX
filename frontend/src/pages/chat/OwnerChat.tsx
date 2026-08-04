import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  getOwnerClaims,
  type ClaimResponse,
} from "@/services/claimService";

const OwnerChats = () => {
  const [claims, setClaims] = useState<ClaimResponse[]>([]);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const data = await getOwnerClaims();
      setClaims(data);
    } catch (error) {
      console.error("Failed to load claims:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      <h1 className="text-3xl font-bold">Incoming Claims</h1>

      {claims.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-slate-500">
            No incoming claims yet.
          </CardContent>
        </Card>
      ) : (
        claims.map((claim) => (
          <Card key={claim.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p>
                  Claimed By: <strong>{claim.claimerEmail}</strong>
                </p>
                <p>
                  Chat Room ID: <span className="font-mono text-sm">{claim.chatRoomId}</span>
                </p>
              </div>

              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link to={`/chat/${claim.chatRoomId}`}>Open Chat</Link>
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default OwnerChats;
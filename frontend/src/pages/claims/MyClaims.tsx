import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getMyClaims,
  type ClaimResponse,
} from "@/services/claimService";

const MyClaims = () => {
  const [claims, setClaims] = useState<ClaimResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const data = await getMyClaims();

      console.log("Claims Response:", data);

      setClaims(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading claims...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Claims</h1>

      {!claims.length ? (
        <Card>
          <CardContent className="p-8 text-center">
            No claims found.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <Card key={claim.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div className="space-y-1">
                  <p>
                    <b>Claim ID:</b> {claim.id}
                  </p>

                  <p>
                    <b>Item ID:</b> {claim.itemId}
                  </p>

                  <p>
                    <b>Owner:</b> {claim.ownerEmail}
                  </p>

                  <p>
                    <b>Claimer:</b> {claim.claimerEmail}
                  </p>

                  <p>
                    <b>Claimed At:</b>{" "}
                    {new Date(claim.claimedAt).toLocaleString()}
                  </p>
                </div>

                <Button asChild>
                  <Link
                    to={`/chat/${claim.chatRoomId}`}
                    state={{
                      ownerEmail: claim.ownerEmail,
                      claimerEmail: claim.claimerEmail,
                    }}
                    onClick={() => {
                      console.log("Navigating With State");
                      console.log({
                        ownerEmail: claim.ownerEmail,
                        claimerEmail: claim.claimerEmail,
                        chatRoomId: claim.chatRoomId,
                      });
                    }}
                  >
                    Open Chat
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClaims;
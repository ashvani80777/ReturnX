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
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-4">

      <h1 className="text-3xl font-bold">
        Incoming Claims
      </h1>

      {
        claims.map((claim) => (

          <Card key={claim.id}>

            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p>
                  Claimed By :
                  <strong> {claim.claimerEmail}</strong>
                </p>

                <p>
                  Chat :
                  <strong> {claim.chatRoomId}</strong>
                </p>

              </div>

              <Button asChild>

                <Link to={`/chat/${claim.chatRoomId}`}>
                  Open Chat
                </Link>

              </Button>

            </CardContent>

          </Card>

        ))
      }

    </div>
  );
};

export default OwnerChats;
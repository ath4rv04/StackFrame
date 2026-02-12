"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import FacePile from "@convex-dev/presence/facepile";
import usePresence from "@convex-dev/presence/react";

interface iAppProps {
    roomId : Id<"posts">;
    userId: string;
}

export function PostPresence({userId, roomId} : iAppProps) {
    const presenceState = usePresence(api.presence, roomId, userId);

    if(!presenceState || presenceState.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
      
            <span>
                {presenceState.length} reading
            </span>

            <div className="flex items-center">
                <FacePile presenceState={presenceState} />
            </div>

        </div>
    )
}
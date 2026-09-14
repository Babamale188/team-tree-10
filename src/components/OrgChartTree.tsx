import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/org-utils";
import { useSignedUrl } from "@/hooks/use-signed-url";
import type { OrgNode } from "@/lib/types";

interface OrgChartNodeProps {
  node: OrgNode;
  isRoot?: boolean;
}

function OrgChartNode({ node, isRoot }: OrgChartNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  const signedUrl = useSignedUrl(node.photo_url);

  return (
    <div className="flex flex-col items-center">
      <Link
        to="/employee/$employeeId"
        params={{ employeeId: node.id }}
        className="group relative"
      >
        <div className="flex flex-col items-center rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 min-w-[160px] max-w-[200px]">
          <Avatar className="h-14 w-14 mb-2 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <AvatarImage src={signedUrl ?? undefined} alt={node.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {getInitials(node.name)}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm text-center text-foreground group-hover:text-primary transition-colors truncate w-full">
            {node.name}
          </p>
          <p className="text-xs text-muted-foreground text-center truncate w-full">
            {node.title}
          </p>
        </div>
      </Link>

      {hasChildren && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
          {node.children.length}
        </button>
      )}

      {hasChildren && expanded && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="relative flex gap-6">
            {node.children.length > 1 && (
              <div className="absolute top-0 left-[calc(50%-50%+80px)] right-[calc(50%-50%+80px)] h-px bg-border" style={{ left: '80px', right: '80px', width: 'calc(100% - 160px)', marginLeft: 'auto', marginRight: 'auto' }} />
            )}
            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-4 bg-border" />
                <OrgChartNode node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface OrgChartTreeProps {
  nodes: OrgNode[];
}

export function OrgChartTree({ nodes }: OrgChartTreeProps) {
  if (nodes.length === 0) return null;

  return (
    <div className="overflow-auto py-8">
      <div className="flex justify-center gap-8 min-w-max px-8">
        {nodes.map((root) => (
          <OrgChartNode key={root.id} node={root} isRoot />
        ))}
      </div>
    </div>
  );
}

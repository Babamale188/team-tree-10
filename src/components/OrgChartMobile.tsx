import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/org-utils";
import { useSignedUrl } from "@/hooks/use-signed-url";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { OrgNode } from "@/lib/types";

interface MobileNodeProps {
  node: OrgNode;
  depth: number;
}

function MobileNode({ node, depth }: MobileNodeProps) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children.length > 0;
  const signedUrl = useSignedUrl(node.photo_url);

  return (
    <div>
      <div
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-accent transition-colors"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {hasChildren ? (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="flex items-center gap-3 w-full text-left">
              {open ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={signedUrl ?? undefined} alt={node.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getInitials(node.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <Link
                  to="/employee/$employeeId"
                  params={{ employeeId: node.id }}
                  className="font-medium text-sm hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {node.name}
                </Link>
                <p className="text-xs text-muted-foreground truncate">{node.title}</p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {node.children.map((child) => (
                <MobileNode key={child.id} node={child} depth={depth + 1} />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <>
            <User className="h-4 w-4 text-muted-foreground shrink-0 ml-0.5" />
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={signedUrl ?? undefined} alt={node.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {getInitials(node.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <Link
                to="/employee/$employeeId"
                params={{ employeeId: node.id }}
                className="font-medium text-sm hover:text-primary transition-colors"
              >
                {node.name}
              </Link>
              <p className="text-xs text-muted-foreground truncate">{node.title}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface OrgChartMobileProps {
  nodes: OrgNode[];
}

export function OrgChartMobile({ nodes }: OrgChartMobileProps) {
  if (nodes.length === 0) return null;

  return (
    <div className="space-y-1 py-4">
      {nodes.map((root) => (
        <MobileNode key={root.id} node={root} depth={0} />
      ))}
    </div>
  );
}

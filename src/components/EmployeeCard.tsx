import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getInitials } from "@/lib/org-utils";
import { useSignedUrl } from "@/hooks/use-signed-url";
import type { Employee } from "@/lib/types";

interface EmployeeCardProps {
  employee: Employee;
  compact?: boolean;
}

export function EmployeeCard({ employee, compact }: EmployeeCardProps) {
  const signedUrl = useSignedUrl(employee.photo_url);

  return (
    <Link
      to="/employee/$employeeId"
      params={{ employeeId: employee.id }}
      className="block"
    >
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className={compact ? "p-3" : "p-6"}>
          <div className="flex flex-col items-center text-center">
            <Avatar className={compact ? "h-10 w-10" : "h-20 w-20"}>
              <AvatarImage src={signedUrl ?? undefined} alt={employee.name} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <p className="mt-3 font-semibold text-foreground truncate w-full group-hover:text-primary transition-colors">
              {employee.name}
            </p>
            <p className="text-sm text-muted-foreground truncate w-full">{employee.title}</p>
            {!compact && employee.department && (
              <p className="text-xs text-muted-foreground/70 truncate w-full">{employee.department}</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

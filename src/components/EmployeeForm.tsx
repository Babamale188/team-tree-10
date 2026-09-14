import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getInitials } from "@/lib/org-utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Employee } from "@/lib/types";
import { DEPARTMENTS } from "@/lib/departments";
import { useSignedUrl } from "@/hooks/use-signed-url";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SKILLS = 20;
const MAX_SKILL_LENGTH = 100;

const schema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  title: z.string().min(1, "Title is required").max(255),
  department: z.string().optional().nullable(),
  bio: z.string().max(2000).optional(),
  manager_id: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

interface EmployeeFormProps {
  employee?: Employee | null;
  allEmployees: Employee[];
  onSubmit: (data: FormValues & { photo_url?: string | null; skills: string[]; department?: string | null }) => void;
  isLoading?: boolean;
}

export function EmployeeForm({ employee, allEmployees, onSubmit, isLoading }: EmployeeFormProps) {
  const [skills, setSkills] = useState<string[]>(employee?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(employee?.photo_url ?? null);
  const [uploading, setUploading] = useState(false);
  const signedPhotoUrl = useSignedUrl(photoUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: employee?.name ?? "",
      title: employee?.title ?? "",
      department: employee?.department ?? null,
      bio: employee?.bio ?? "",
      manager_id: employee?.manager_id ?? null,
    },
  });

  const managerOptions = allEmployees.filter((e) => e.id !== employee?.id);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (trimmed.length > MAX_SKILL_LENGTH) {
      toast.error(`Skill must be ${MAX_SKILL_LENGTH} characters or less`);
      return;
    }
    if (skills.length >= MAX_SKILLS) {
      toast.error(`Maximum ${MAX_SKILLS} skills allowed`);
      return;
    }
    if (!skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP images are allowed");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File must be 5MB or smaller");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("profile-photos")
        .upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(fileName);
      setPhotoUrl(urlData.publicUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      photo_url: photoUrl,
      skills,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Photo */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={signedPhotoUrl ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {form.watch("name") ? getInitials(form.watch("name")) : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Photo"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </Button>
            {photoUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 text-destructive"
                onClick={() => setPhotoUrl(null)}
              >
                Remove
              </Button>
            )}
            <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, or WebP. Max 5MB.</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. VP of Engineering" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                value={field.value ?? "none"}
                onValueChange={(v) => field.onChange(v === "none" ? null : v)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No department</SelectItem>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short bio about this person..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manager_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reports To</FormLabel>
              <Select
                value={field.value ?? "none"}
                onValueChange={(v) => field.onChange(v === "none" ? null : v)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No manager (top-level)</SelectItem>
                  {managerOptions.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name} — {emp.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Skills <span className="text-muted-foreground font-normal">({skills.length}/{MAX_SKILLS})</span>
          </label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value.slice(0, MAX_SKILL_LENGTH))}
              placeholder="Add a skill"
              maxLength={MAX_SKILL_LENGTH}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" variant="outline" size="icon" onClick={addSkill} disabled={skills.length >= MAX_SKILLS}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : employee ? "Update Employee" : "Add Employee"}
        </Button>
      </form>
    </Form>
  );
}

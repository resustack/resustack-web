import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Control, FieldErrors } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';

type ContactFieldsProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  disabled?: boolean;
};

export function ContactFields({ control, errors, disabled }: ContactFieldsProps) {
  const { field: phoneField } = useController({
    name: 'profile.contact.phone',
    control,
    defaultValue: '',
  });

  const { field: emailField } = useController({
    name: 'profile.contact.email',
    control,
    defaultValue: '',
  });

  const { field: githubField } = useController({
    name: 'profile.contact.github',
    control,
    defaultValue: '',
  });

  const { field: linkedinField } = useController({
    name: 'profile.contact.linkedin',
    control,
    defaultValue: '',
  });

  const { field: blogField } = useController({
    name: 'profile.contact.blog',
    control,
    defaultValue: '',
  });

  return (
    <div className="space-y-4">
      <h4 className="font-medium">연락처</h4>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">전화번호</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="010-1234-5678"
          {...phoneField}
          disabled={disabled}
        />
        {errors.profile?.contact?.phone && (
          <p className="text-sm text-destructive">{errors.profile.contact.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...emailField}
          disabled={disabled}
        />
        {errors.profile?.contact?.email && (
          <p className="text-sm text-destructive">{errors.profile.contact.email.message}</p>
        )}
      </div>

      {/* GitHub */}
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/username"
          {...githubField}
          disabled={disabled}
        />
        {errors.profile?.contact?.github && (
          <p className="text-sm text-destructive">{errors.profile.contact.github.message}</p>
        )}
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/username"
          {...linkedinField}
          disabled={disabled}
        />
        {errors.profile?.contact?.linkedin && (
          <p className="text-sm text-destructive">{errors.profile.contact.linkedin.message}</p>
        )}
      </div>

      {/* Blog */}
      <div className="space-y-2">
        <Label htmlFor="blog">블로그</Label>
        <Input
          id="blog"
          type="url"
          placeholder="https://blog.example.com"
          {...blogField}
          disabled={disabled}
        />
        {errors.profile?.contact?.blog && (
          <p className="text-sm text-destructive">{errors.profile.contact.blog.message}</p>
        )}
      </div>
    </div>
  );
}

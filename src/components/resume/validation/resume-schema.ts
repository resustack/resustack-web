import { z } from 'zod';

/**
 * Zod validation schema for resume form
 */

export const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email('유효한 이메일을 입력하세요').optional().or(z.literal('')),
  github: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  linkedin: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  blog: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
});

export const profileSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  position: z.string().optional(),
  introduction: z.string().optional(),
  photoUrl: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  contact: contactSchema.optional(),
});

export const skillsSchema = z.object({
  language: z.array(z.string()).optional(),
  framework: z.array(z.string()).optional(),
  database: z.array(z.string()).optional(),
  devOps: z.array(z.string()).optional(),
  tool: z.array(z.string()).optional(),
  library: z.array(z.string()).optional(),
  testing: z.array(z.string()).optional(),
  collaboration: z.array(z.string()).optional(),
  etc: z.array(z.string()).optional(),
});

export const blockMetaSchema = z.object({
  techStack: z.array(z.string()).optional(),
  link: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
});

export const blockSchema = z.object({
  id: z.string(),
  subTitle: z.string().optional(),
  period: z.string().optional(),
  content: z.string().optional(),
  visible: z.boolean().optional(),
  blockMeta: blockMetaSchema.optional(),
});

export const sectionSchema = z.object({
  id: z.string(),
  type: z.enum(['WORK_EXPERIENCE', 'PROJECT', 'EDUCATION']).optional(),
  title: z.string().min(1, '섹션 제목은 필수입니다'),
  orderIndex: z.number().optional(),
  blocks: z.array(blockSchema).optional(),
});

export const resumeFormSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  public: z.boolean(),
  profile: profileSchema.optional(),
  skills: skillsSchema.optional(),
  sections: z.array(sectionSchema).optional(),
});

export type ResumeFormData = z.infer<typeof resumeFormSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type SectionFormData = z.infer<typeof sectionSchema>;
export type BlockFormData = z.infer<typeof blockSchema>;

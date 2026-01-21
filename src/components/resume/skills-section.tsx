import type { Skills } from '@/types/resume';

type SkillsSectionProps = {
  skills: Skills;
};

type SkillCategoryProps = {
  title: string;
  skills: string[];
};

function SkillCategory({ title, skills }: SkillCategoryProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  if (!hasSkills) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">기술 스택</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillCategory title="언어" skills={skills.language ?? []} />
        <SkillCategory title="프레임워크" skills={skills.framework ?? []} />
        <SkillCategory title="데이터베이스" skills={skills.database ?? []} />
        <SkillCategory title="DevOps" skills={skills.devOps ?? []} />
        <SkillCategory title="도구" skills={skills.tool ?? []} />
        <SkillCategory title="라이브러리" skills={skills.library ?? []} />
        <SkillCategory title="테스팅" skills={skills.testing ?? []} />
        <SkillCategory title="협업" skills={skills.collaboration ?? []} />
        <SkillCategory title="기타" skills={skills.etc ?? []} />
      </div>
    </div>
  );
}

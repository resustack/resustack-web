import type { Section, Block } from '@/types/resume';

type SectionsContentProps = {
  sections: Section[];
};

type BlockCardProps = {
  block: Block;
};

function BlockCard({ block }: BlockCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-2">
      {block.subTitle && (
        <h4 className="font-medium">{block.subTitle}</h4>
      )}
      {block.period && (
        <div className="text-sm text-muted-foreground">{block.period}</div>
      )}
      {block.content && (
        <p className="text-sm whitespace-pre-wrap">{block.content}</p>
      )}
      {block.blockMeta?.techStack && block.blockMeta.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {block.blockMeta.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs bg-secondary px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {block.blockMeta?.link && (
        <a
          href={block.blockMeta.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline inline-block mt-1"
        >
          링크 보기 →
        </a>
      )}
    </div>
  );
}

export function SectionsContent({ sections }: SectionsContentProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">상세 내용</h2>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <h3 className="font-semibold text-base">{section.title}</h3>
            {section.blocks && section.blocks.length > 0 ? (
              <div className="space-y-4">
                {section.blocks.map((block) => (
                  <BlockCard key={block.id} block={block} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">내용이 없습니다.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

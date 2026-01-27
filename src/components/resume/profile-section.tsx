import type { Profile } from '@/types/resume';

type ProfileSectionProps = {
  profile: Profile;
};

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">프로필</h2>
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-muted-foreground">이름:</span>
          <span className="ml-2">{profile.name}</span>
        </div>
        {profile.position && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">포지션:</span>
            <span className="ml-2">{profile.position}</span>
          </div>
        )}
        {profile.introduction && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">소개:</span>
            <p className="mt-1 text-muted-foreground">{profile.introduction}</p>
          </div>
        )}
        {profile.contact && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">연락처:</span>
            <div className="mt-1 space-y-1 text-sm">
              {profile.contact.email && (
                <div>이메일: {profile.contact.email}</div>
              )}
              {profile.contact.phone && (
                <div>전화: {profile.contact.phone}</div>
              )}
              {profile.contact.github && (
                <div>
                  GitHub:{' '}
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.contact.github}
                  </a>
                </div>
              )}
              {profile.contact.linkedin && (
                <div>
                  LinkedIn:{' '}
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.contact.linkedin}
                  </a>
                </div>
              )}
              {profile.contact.blog && (
                <div>
                  Blog:{' '}
                  <a
                    href={profile.contact.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.contact.blog}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

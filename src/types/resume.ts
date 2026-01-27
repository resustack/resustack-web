/**
 * 이력서 API 응답 타입
 */

/**
 * 이력서 상태
 */
export type ResumeStatus = 'ACTIVE' | 'INACTIVE';

/**
 * 이력서 요약 정보 (목록 조회용)
 */
export type ResumeSummary = {
  id: string;
  title: string;
  status: ResumeStatus;
  updatedAt: string;
  public: boolean;
};

/**
 * 페이징 응답
 */
export type PaginationResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

/**
 * API 공통 응답 포맷
 */
export type ApiResponse<T> = {
  timestamp: string;
  httpStatus: number;
  data: T | null;
  errorCode: string | null;
};

/**
 * 이력서 목록 조회 응답
 */
export type ResumeListResponse = ApiResponse<PaginationResponse<ResumeSummary>>;

/**
 * 연락처 정보
 */
export type Contact = {
  phone?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  blog?: string;
};

/**
 * 프로필 정보
 */
export type Profile = {
  name: string;
  position?: string;
  introduction?: string;
  contact?: Contact;
  photoUrl?: string;
};

/**
 * 블록 메타 정보
 */
export type BlockMeta = {
  techStack?: string[];
  link?: string;
};

/**
 * 블록 정보
 */
export type Block = {
  id: string;
  subTitle?: string;
  period?: string;
  content?: string;
  blockMeta?: BlockMeta;
  visible?: boolean;
};

/**
 * 섹션 타입
 */
export type SectionType = 'WORK_EXPERIENCE' | 'PROJECT' | 'EDUCATION';

/**
 * 섹션 정보
 */
export type Section = {
  id: string;
  type?: SectionType;
  title: string;
  orderIndex?: number;
  blocks?: Block[];
};

/**
 * 기술 스택 정보
 */
export type Skills = {
  devOps?: string[];
  language?: string[];
  framework?: string[];
  database?: string[];
  tool?: string[];
  library?: string[];
  testing?: string[];
  collaboration?: string[];
  etc?: string[];
};

/**
 * 이력서 상세 정보
 */
export type ResumeDetail = {
  id: string;
  userId: number;
  title: string;
  templateId: string;
  profile: Profile;
  sections: Section[];
  skills: Skills;
  status: ResumeStatus;
  public: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * 이력서 상세 조회 응답
 */
export type ResumeDetailResponse = ApiResponse<ResumeDetail>;

/**
 * 이력서 생성 요청
 */
export type ResumeCreateRequest = {
  title: string;
  templateId: string;
  profile?: Profile;
  sections?: Section[];
  skills?: Skills;
  public?: boolean;
};

/**
 * 이력서 수정 요청
 */
export type ResumeUpdateRequest = {
  title: string;
  profile?: Profile;
  sections?: Section[];
  skills?: Skills;
  public?: boolean;
};

/**
 * 템플릿 상태
 */
export type TemplateStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

/**
 * 레이아웃 타입
 */
export type LayoutType = 'SINGLE_COLUMN' | 'TWO_COLUMN_LEFT';

/**
 * 여백 정보
 */
export type Spacing = {
  section?: number;
  block?: number;
  line?: number;
};

/**
 * 테마 정보
 */
export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  spacing?: Spacing;
};

/**
 * 기본 섹션 정보
 */
export type DefaultSection = {
  type: SectionType;
  title: string;
  orderIndex: number;
};

/**
 * 템플릿 정보
 */
export type Template = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layoutType: LayoutType;
  theme: Theme;
  defaultSections: DefaultSection[];
  status: TemplateStatus;
  createdAt: string;
  updatedAt: string;
};

/**
 * 템플릿 목록 조회 응답
 */
export type TemplateListResponse = ApiResponse<Template[]>;

export type NewsCategory =
  | "Tin nhà trường"
  | "Tin giáo dục"
  | "Thành tích"
  | "Ngoại khóa"
  | "Cuộc thi";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: NewsCategory;
  image: string;
  publishedAt: string;
  author: string;
  pinned: boolean;
  readTime: number;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  type: "Học thuật" | "Tuyển sinh" | "Ngoại khóa" | "Cộng đồng";
  featured: boolean;
}

export type ApplicationStatus =
  | "Đã tiếp nhận"
  | "Đang xét duyệt"
  | "Cần bổ sung"
  | "Đủ điều kiện"
  | "Đã nhập học";

export interface AdmissionApplication {
  id: string;
  studentName: string;
  dateOfBirth: string;
  gender: "Nam" | "Nữ" | "Khác";
  currentSchool: string;
  desiredGrade: "10" | "11" | "12";
  parentName: string;
  phone: string;
  email: string;
  address: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  note?: string;
}

export type ScheduleType = "Lịch học" | "Lịch thi" | "Ngày nghỉ" | "Sự kiện";

export interface ScheduleItem {
  id: string;
  title: string;
  type: ScheduleType;
  date: string;
  startTime?: string;
  endTime?: string;
  className?: string;
  location?: string;
  teacher?: string;
  description?: string;
}

export type FacilityCategory =
  | "Thư viện"
  | "Phòng học"
  | "Phòng thí nghiệm"
  | "Xe đưa đón";

export interface Facility {
  id: string;
  name: string;
  category: FacilityCategory;
  description: string;
  image: string;
  images: string[];
  features: string[];
  capacity?: number;
  accessibility: string[];
  virtualTourAvailable: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  email: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: "Ảnh" | "Video";
  image: string;
  category: NewsCategory;
}

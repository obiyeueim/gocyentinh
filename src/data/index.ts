import applicationsJson from "./applications.json";
import eventsJson from "./events.json";
import facilitiesJson from "./facilities.json";
import newsJson from "./news.json";
import schedulesJson from "./schedules.json";
import type {
  AdmissionApplication,
  EventItem,
  Facility,
  FacultyMember,
  MediaItem,
  NewsItem,
  ScheduleItem,
} from "@/types";

export const newsItems = newsJson as NewsItem[];
export const events = eventsJson as EventItem[];
export const applications = applicationsJson as AdmissionApplication[];
export const schedules = schedulesJson as ScheduleItem[];
export const facilities = facilitiesJson as Facility[];

export const faculty: FacultyMember[] = [
  {
    id: "faculty-01",
    name: "TS. Nguyễn Thanh Hà",
    role: "Hiệu trưởng",
    department: "Ban Giám hiệu",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    email: "hantt@minhkhai.edu.vn",
  },
  {
    id: "faculty-02",
    name: "ThS. Trần Mai Phương",
    role: "Phó Hiệu trưởng",
    department: "Ban Giám hiệu",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    email: "phuongtm@minhkhai.edu.vn",
  },
  {
    id: "faculty-03",
    name: "ThS. Lê Quang Minh",
    role: "Phó Hiệu trưởng",
    department: "Ban Giám hiệu",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    email: "minhlq@minhkhai.edu.vn",
  },
  {
    id: "faculty-04",
    name: "Cô Nguyễn Thùy Dung",
    role: "Tổ trưởng",
    department: "Toán – Tin",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    email: "dungnt@minhkhai.edu.vn",
  },
  {
    id: "faculty-05",
    name: "Thầy Vũ Hoàng Long",
    role: "Tổ trưởng",
    department: "Khoa học Tự nhiên",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    email: "longvh@minhkhai.edu.vn",
  },
  {
    id: "faculty-06",
    name: "Cô Phạm Bảo Châu",
    role: "Tổ trưởng",
    department: "Ngoại ngữ",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    email: "chaupb@minhkhai.edu.vn",
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "media-01",
    title: "Ngày hội STEM 2026",
    type: "Ảnh",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    category: "Ngoại khóa",
  },
  {
    id: "media-02",
    title: "Khoảnh khắc khai giảng",
    type: "Video",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
    category: "Tin nhà trường",
  },
  {
    id: "media-03",
    title: "Chung kết bóng rổ học sinh",
    type: "Ảnh",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
    category: "Ngoại khóa",
  },
  {
    id: "media-04",
    title: "Một ngày tại Minh Khai",
    type: "Video",
    image:
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=80",
    category: "Tin nhà trường",
  },
  {
    id: "media-05",
    title: "Triển lãm Mỹ thuật",
    type: "Ảnh",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80",
    category: "Cuộc thi",
  },
  {
    id: "media-06",
    title: "Hành trình thiện nguyện",
    type: "Ảnh",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    category: "Ngoại khóa",
  },
];

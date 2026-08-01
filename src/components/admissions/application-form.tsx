"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileUp,
  Info,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { FormEvent, useState } from "react";
import type { AdmissionApplication } from "@/types";

type FormDraft = Pick<
  AdmissionApplication,
  | "studentName"
  | "dateOfBirth"
  | "gender"
  | "currentSchool"
  | "desiredGrade"
  | "parentName"
  | "phone"
  | "email"
  | "address"
>;

const initialDraft: FormDraft = {
  studentName: "",
  dateOfBirth: "",
  gender: "Nam",
  currentSchool: "",
  desiredGrade: "10",
  parentName: "",
  phone: "",
  email: "",
  address: "",
};

const steps = [
  { id: 1, label: "Học sinh" },
  { id: 2, label: "Phụ huynh" },
  { id: 3, label: "Hồ sơ" },
] as const;

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<FormDraft>(initialDraft);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  function update<K extends keyof FormDraft>(key: K, value: FormDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function continueStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, 3));
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setApplicationId(`MK2026${Math.floor(1000 + Math.random() * 8999)}`);
    }, 850);
  }

  if (applicationId) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-10" role="status">
        <span className="grid size-14 place-items-center rounded-2xl bg-emerald-800 text-white">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-3xl font-bold text-emerald-950">
          Đăng ký đã được ghi nhận
        </h3>
        <p className="mt-3 max-w-xl leading-7 text-emerald-900/70">
          Cảm ơn gia đình {draft.studentName}. Bộ phận Tuyển sinh sẽ liên hệ qua số{" "}
          <strong>{draft.phone}</strong> trong vòng 02 ngày làm việc.
        </p>
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            Mã hồ sơ mô phỏng
          </p>
          <p className="mt-2 font-mono text-2xl font-bold tracking-wider text-emerald-900">
            {applicationId}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Hãy lưu lại mã này để tra cứu. Dữ liệu hiện chỉ dùng cho bản demo và
            không được gửi đến máy chủ.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDraft(initialDraft);
            setStep(1);
            setApplicationId(null);
          }}
          className="button-secondary mt-6"
        >
          Tạo hồ sơ khác
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-7">
        <ol className="grid grid-cols-3 gap-2" aria-label="Tiến trình đăng ký">
          {steps.map((item) => {
            const active = item.id === step;
            const complete = item.id < step;
            return (
              <li key={item.id}>
                <div className="flex items-center gap-2">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                      complete
                        ? "bg-emerald-800 text-white"
                        : active
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-200 text-slate-500"
                    }`}
                    aria-hidden="true"
                  >
                    {complete ? <Check className="size-4" /> : item.id}
                  </span>
                  <span
                    className={`hidden text-xs font-extrabold sm:block ${
                      active ? "text-emerald-800" : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  className={`mt-3 h-1 rounded-full ${
                    item.id <= step ? "bg-emerald-700" : "bg-slate-200"
                  }`}
                />
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-8">
        {step === 1 && (
          <form onSubmit={continueStep}>
            <div>
              <p className="eyebrow">Bước 1/3</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-slate-950">
                Thông tin học sinh
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Vui lòng nhập đúng thông tin theo giấy khai sinh.
              </p>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Họ và tên học sinh" id="student-name">
                <input
                  id="student-name"
                  required
                  minLength={3}
                  autoComplete="name"
                  className="input-control"
                  value={draft.studentName}
                  onChange={(event) => update("studentName", event.target.value)}
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                />
              </Field>
              <Field label="Ngày sinh" id="date-of-birth">
                <input
                  id="date-of-birth"
                  required
                  type="date"
                  className="input-control"
                  value={draft.dateOfBirth}
                  onChange={(event) => update("dateOfBirth", event.target.value)}
                />
              </Field>
              <Field label="Giới tính" id="gender">
                <select
                  id="gender"
                  className="input-control"
                  value={draft.gender}
                  onChange={(event) =>
                    update("gender", event.target.value as FormDraft["gender"])
                  }
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </Field>
              <Field label="Đăng ký vào khối" id="desired-grade">
                <select
                  id="desired-grade"
                  className="input-control"
                  value={draft.desiredGrade}
                  onChange={(event) =>
                    update(
                      "desiredGrade",
                      event.target.value as FormDraft["desiredGrade"],
                    )
                  }
                >
                  <option value="10">Khối 10</option>
                  <option value="11">Khối 11</option>
                  <option value="12">Khối 12</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Trường THCS đang theo học" id="current-school">
                  <input
                    id="current-school"
                    required
                    className="input-control"
                    value={draft.currentSchool}
                    onChange={(event) => update("currentSchool", event.target.value)}
                    placeholder="Tên trường hiện tại"
                  />
                </Field>
              </div>
            </div>
            <div className="mt-7 flex justify-end">
              <button className="button-primary" type="submit">
                Tiếp tục
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={continueStep}>
            <div>
              <p className="eyebrow">Bước 2/3</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-slate-950">
                Thông tin phụ huynh
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Nhà trường dùng thông tin này để liên hệ về hồ sơ.
              </p>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Họ và tên phụ huynh" id="parent-name">
                <input
                  id="parent-name"
                  required
                  minLength={3}
                  autoComplete="name"
                  className="input-control"
                  value={draft.parentName}
                  onChange={(event) => update("parentName", event.target.value)}
                />
              </Field>
              <Field label="Số điện thoại" id="parent-phone">
                <input
                  id="parent-phone"
                  required
                  type="tel"
                  inputMode="tel"
                  pattern="0[0-9]{9}"
                  autoComplete="tel"
                  className="input-control"
                  value={draft.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="10 chữ số, bắt đầu bằng 0"
                />
              </Field>
              <Field label="Email" id="parent-email">
                <input
                  id="parent-email"
                  required
                  type="email"
                  autoComplete="email"
                  className="input-control"
                  value={draft.email}
                  onChange={(event) => update("email", event.target.value)}
                />
              </Field>
              <Field label="Địa chỉ liên hệ" id="address">
                <input
                  id="address"
                  required
                  autoComplete="street-address"
                  className="input-control"
                  value={draft.address}
                  onChange={(event) => update("address", event.target.value)}
                />
              </Field>
            </div>
            <div className="mt-7 flex justify-between gap-3">
              <button type="button" onClick={() => setStep(1)} className="button-secondary">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Quay lại
              </button>
              <button className="button-primary" type="submit">
                Tiếp tục
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={submitApplication}>
            <div>
              <p className="eyebrow">Bước 3/3</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-slate-950">
                Hồ sơ đính kèm
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Chấp nhận tệp PDF, JPG hoặc PNG, tối đa 5 MB/tệp.
              </p>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <FileField id="report-card" label="Học bạ THCS" required />
              <FileField id="birth-certificate" label="Giấy khai sinh" required />
              <FileField id="portrait" label="Ảnh chân dung 3×4" required />
              <FileField id="certificate" label="Chứng nhận thành tích (nếu có)" />
            </div>
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <label className="flex items-start gap-3 text-sm leading-6 text-emerald-950">
                <input
                  type="checkbox"
                  required
                  className="mt-1 size-4 accent-emerald-700"
                />
                <span>
                  Tôi xác nhận thông tin cung cấp là chính xác và đồng ý để nhà
                  trường xử lý dữ liệu cho mục đích tuyển sinh.
                </span>
              </label>
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
              Dữ liệu trong bản demo chỉ được xử lý trên trình duyệt và không được
              tải lên máy chủ.
            </div>
            <div className="mt-7 flex justify-between gap-3">
              <button type="button" onClick={() => setStep(2)} className="button-secondary">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Quay lại
              </button>
              <button disabled={submitting} className="button-primary disabled:opacity-60" type="submit">
                {submitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi đăng ký
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span className="text-rose-600" aria-hidden="true">*</span>
      </label>
      {children}
    </div>
  );
}

function FileField({
  id,
  label,
  required = false,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="group flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
    >
      <FileUp
        className="size-6 text-slate-400 group-hover:text-emerald-700"
        aria-hidden="true"
      />
      <span className="mt-3 text-sm font-bold text-slate-700">
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </span>
      <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400">
        <Info className="size-3" aria-hidden="true" />
        Chọn tệp từ thiết bị
      </span>
      <input
        id={id}
        type="file"
        required={required}
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
      />
    </label>
  );
}

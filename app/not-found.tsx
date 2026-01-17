import { HomeIcon, VideoIcon, MoveRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#FDFCF8] selection:bg-rose-200 selection:text-rose-900">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-200/40 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/40 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply [animation-delay:2s]" />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-amber-100/40 rounded-full blur-[80px] animate-float mix-blend-multiply" />
        
        <div className="absolute top-[10%] right-[20%] w-8 h-8 bg-gradient-to-br from-rose-200 to-rose-300 rounded-[50%_0_50%_50%] opacity-60 animate-float [animation-duration:10s] blur-[1px]" />
        <div className="absolute bottom-[20%] left-[10%] w-6 h-6 bg-gradient-to-br from-rose-200 to-rose-300 rounded-[50%_0_50%_50%] opacity-50 animate-float [animation-duration:12s] [animation-delay:-2s]" />
        
        <div className="absolute top-[30%] left-[20%] w-4 h-4 bg-rose-200 rounded-[50%_0_50%_50%] opacity-30 animate-float [animation-duration:18s] [animation-delay:-5s] blur-[2px]" />
        <div className="absolute bottom-[40%] right-[15%] w-3 h-3 bg-rose-200 rounded-[50%_0_50%_50%] opacity-30 animate-float [animation-duration:20s] [animation-delay:-8s] blur-[2px]" />
        <div className="absolute top-[60%] right-[30%] w-5 h-5 bg-rose-100 rounded-[50%_0_50%_50%] opacity-40 animate-float [animation-duration:15s] [animation-delay:-12s] blur-[1px]" />
      </div>

      <main className="relative z-10 w-full max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] p-8 sm:p-12 md:p-16 text-center group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(255,182,193,0.15)] hover:bg-white/50">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

          <div className="mx-auto mb-8 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-100 to-white shadow-inner border border-white/80 animate-bloom">
             <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12.5 2.5C14 4 16.5 5.5 19 5.5C19.5 5.5 20.5 5.5 21 5L22 6C21.5 7 20.5 8.5 19 9.5C17.5 10.5 15.5 11 13.5 11C13.5 11 13 11 12.5 11.5L12 12M12 22L11.5 21.5C10 20 7.5 18.5 5 18.5C4.5 18.5 3.5 18.5 3 19L2 18C2.5 17 3.5 15.5 5 14.5C6.5 13.5 8.5 13 10.5 13C10.5 13 11 13 11.5 12.5L12 12M12 12C12.5 12.5 13 13 13.5 13C15.5 13 17.5 13.5 19 14.5C20.5 15.5 21.5 17 22 18L21 19C20.5 18.5 19.5 18.5 19 18.5C16.5 18.5 14 20 12.5 21.5L12 22M12 12C11.5 11.5 11 11 10.5 11C8.5 11 6.5 10.5 5 9.5C3.5 8.5 2.5 7 2 6L3 5C3.5 5.5 4.5 5.5 5 5.5C7.5 5.5 10 4 11.5 2.5L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" className="text-rose-300" />
             </svg>
          </div>

          <div className="relative z-10 space-y-2">
             <h1 className="text-7xl sm:text-8xl font-thin tracking-tighter text-rose-950/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] select-none pointer-events-none blur-[1px]">
              404
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed pt-4 pb-8 max-w-md mx-auto">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.<br className="hidden sm:block"/>
              꽃동산 아카데미와 함께 새로운 배움의 길을 찾아보세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link
              href="/"
              className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full bg-slate-900 overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <HomeIcon size={18} />
                홈으로 돌아가기
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/course"
              className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-full transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 active:scale-95"
            >
              <VideoIcon size={18} />
              강의 둘러보기
              <MoveRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          <div className="my-10 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50" />

          <blockquote className="relative max-w-md mx-auto group-hover:scale-[1.02] transition-transform duration-700 ease-out">
            <p className="text-sm sm:text-base text-slate-500 italic font-serif leading-8 text-balance">
              &ldquo;내가 진실로 진실로 너희에게 이르노니 한 알의 밀이 땅에 떨어져
              죽지 아니하면 한 알 그대로 있고 죽으면 많은 열매를 맺느니라&rdquo;
            </p>
            <cite className="block mt-3 text-xs sm:text-sm font-medium text-rose-400 tracking-wide uppercase not-italic">
              — 요한복음 12:24
            </cite>
          </blockquote>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFCF8] to-transparent pointer-events-none" />
    </div>
  );
}

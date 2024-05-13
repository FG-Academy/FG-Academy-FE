import Image from "next/image";
import Link from "next/link";
import IntroImage from "../../../../public/images/introduceImage.jpeg";
import IntroBackground from "../../../../public/images/introBackground.jpg";

export default function IntroducePage() {
  return (
    <div className="relative flex flex-col h-full">
      <div className="mx-auto">
        <section id="banner" className="flex flex-col">
          <div className="relative flex flex-col justify-center w-full h-40">
            <Image
              src={IntroBackground}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
              alt="인트로 배경"
            />
            <div
              id="div2"
              className="absolute top-0 left-0 z-10 w-full h-40 bg-black opacity-50"
            ></div>
            <h2 className="absolute z-20 left-32 font-sans text-3xl font-medium text-white text-start">
              아카데미 소개
            </h2>
          </div>

          <div id="introText" className="flex flex-col md:flex-row">
            <div className="p-4 md:p-16 md:pr-48 flex flex-col md:flex-row w-full ">
              <div className="flex w-full md:w-[580px] md:h-[480px] m-4">
                <Image
                  alt="Profile"
                  className="rounded-lg animate-slide-in w-full h-auto"
                  src={IntroImage}
                />
              </div>
              <div className="space-y-4 text-sm text-gray-600 flex flex-col w-full m-4 md:m-8 animate-slide-out">
                <p>
                  &quot;한국교회 주일학교가 끝없는 추락하고 있다.&quot;
                  <br />이 명제는 누구도 부인할 수 없는 한국교회 주일학교의 현
                  주소라고 말할 수 있습니다.
                </p>
                <p>
                  특히 코로나로 인해 처참하게 무너진 주일학교는 급속도로
                  발전하는 세상 문화를 압도하지 못하고 있고,
                </p>
                <p>
                  신앙교육보다는 대학입시교육에 매달리는 학부모들과 주말에 더욱
                  성황하고 있는 레저문화의 침투는 주일을 지키는 것 조차 어렵게
                  만들고 있습니다.
                </p>
                <p>
                  결국 한국교회 주일학교가 이런 추세로 나아간다면 다음세대가
                  사라지는 것은 불보듯 뻔한 일입니다.
                </p>
                <p>
                  그리고 저희 아카데미는 언제나 최고의 교육을 제공하기 위해
                  끊임없이 노력하고 있으며, 여러분의 성공적인 미래를 지원하기
                  위해 최선을 다하고 있습니다.
                </p>
                <p>
                  또한 저희는 가치있는 지식과 아이디어를 제공함으로써 바꾸어
                  나가야 할 사회적 문제들에 대한 해결책을 제공하고 있습니다.
                  저희 아카데미와 함께 사회적 가치를 창출해 나가세요.
                </p>

                <p className="text-black text-xl">
                  무엇을 어떻게 가르칠 것인가?
                </p>
                <p>
                  “무엇을 어떻게 가르칠까?” 이 질문은 모든 주일학교 교사들이
                  품고 있는 숙제와 같은 질문입니다.
                  <br /> 좀 더 효과적인 교육을 위해 책도 읽고 이것저것 프로그램
                  강의도 들어보지만 늘 미지한 느낌을 벗어날 수 없습니다.
                  왜냐하면 교사가 무엇을 가르칠지 제대로 모르고 있기 때문입니다.
                </p>
                <p>
                  주일학교 교사들은 성경을 가르치도록 부르심을 받은
                  성경교사들입니다.
                  <br /> 성경이 손에 주고 있지만 막상 성경을 펼치면 무엇을
                  가르쳐야 할지 몰라서 어설픈 성경이야기나 막연한 삶의 지혜를
                  가르치는 교사들도 있습니다.
                </p>
                <p>
                  그러기에 “무엇을 어떻게 가르쳐야 하는가?”는 주일학교 교사들의
                  공통적인 해결과제일 것입니다.
                  <br /> 아무리 성경이 꿀송이처럼 달고 교훈과 책망과 바르게 함과
                  의로 교육하기에 유익한 능력이 있다 할지라고 맛을 내는 요리사가
                  형편없는 사람이라면 성경의 깊은 맛은 제대로 나올 수 없을
                  것입니다.{" "}
                </p>
                <p>
                  꽃동산 아카데미를 통해 교사는 일상생활 속에서도 복음적인 삶의
                  모범이 무엇이지 배우고 가르치게 될 것입니다.
                  <br /> 또한 학부모들은 가정생활 속에서 부딪히는 여러 신앙적
                  애매모호한 요소들을 신앙적으로 해석할 수 있는 능력을 키워줄
                  것이며, 자녀들과 지속적으로 성경과 교리에 관한 대화를 함으로서
                  우리의 자녀들과 아이들이 바르게 세상을 헤쳐 나갈 수 있는
                  지혜와 능력을 키워줄 것입니다.
                </p>
                <p>
                  한국교회와 주일학교가 다시 회복하고 부흥 할 수 있는 방법은
                  오직 성경으로 돌아가는 길밖 에 없습니다. 그런 역할을 꽃동산
                  아카데미가 훌륭히 수행할 것입니다. 그래서 교사들과 주일학교
                  아이들이 말씀으로 바로 서 있을 때 한국 주일학교 역사에는 다시
                  한번 주의 말씀이 흥왕하여 세력을 더하는 짜릿한 부흥의 참
                  기쁨을 누릴 것입니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import IntroImage from "../../../../public/images/introduceImage.jpeg";
// import IntroBackground from "../../../../public/images/introBackground.jpg";

// export default function IntroducePage() {
//   const imageStyle = {
//     width: "auto",
//     height: "30%",
//   };

//   return (
//     <div className="relative flex flex-col h-full">
//       <div className="mx-auto">
//         <section id="banner" className="flex flex-col">
//           <div className="relative flex flex-col justify-center w-full h-40">
//             <Image
//               src={IntroBackground}
//               style={{ width: "100%", height: "160px", objectFit: "cover" }}
//               alt="인트로 배경"
//             />
//             <div
//               id="div2"
//               className="absolute top-0 left-0 z-10 w-full h-40 bg-black opacity-50"
//             ></div>
//             <h2 className="absolute z-20 left-32 font-sans text-3xl font-medium text-white text-start">
//               아카데미 소개
//             </h2>
//           </div>

//           <div id="introText">
//             <div className="p-16 pr-48 flex flex-row w-full h-auto">
//               <div className="flex w-[480px] m-12">
//                 <Image
//                   alt="Profile"
//                   className="rounded-lg animate-slide-in"
//                   src={IntroImage}
//                   style={imageStyle}
//                 />
//               </div>
//               <div className="space-y-4 text-sm text-gray-600 flex flex-col w-full m-8 animate-slide-out">
//                 <p>
//                   &quot;한국교회 주일학교가 끝없는 추락하고 있다.&quot;
//                   <br />이 명제는 누구도 부인할 수 없는 한국교회 주일학교의 현
//                   주소라고 말할 수 있습니다.
//                 </p>
//                 <p>
//                   특히 코로나로 인해 처참하게 무너진 주일학교는 급속도로
//                   발전하는 세상 문화를 압도하지 못하고 있고,
//                 </p>
//                 <p>
//                   신앙교육보다는 대학입시교육에 매달리는 학부모들과 주말에 더욱
//                   성황하고 있는 레저문화의 침투는 주일을 지키는 것 조차 어렵게
//                   만들고 있습니다.
//                 </p>
//                 <p>
//                   결국 한국교회 주일학교가 이런 추세로 나아간다면 다음세대가
//                   사라지는 것은 불보듯 뻔한 일입니다.
//                 </p>
//                 <p>
//                   그리고 저희 아카데미는 언제나 최고의 교육을 제공하기 위해
//                   끊임없이 노력하고 있으며, 여러분의 성공적인 미래를 지원하기
//                   위해 최선을 다하고 있습니다.
//                 </p>
//                 <p>
//                   또한 저희는 가치있는 지식과 아이디어를 제공함으로써 바꾸어
//                   나가야 할 사회적 문제들에 대한 해결책을 제공하고 있습니다.
//                   저희 아카데미와 함께 사회적 가치를 창출해 나가세요.
//                 </p>

//                 <p className="text-black text-xl">
//                   무엇을 어떻게 가르칠 것인가?
//                 </p>
//                 <p>
//                   “무엇을 어떻게 가르칠까?” 이 질문은 모든 주일학교 교사들이
//                   품고 있는 숙제와 같은 질문입니다.
//                   <br /> 좀 더 효과적인 교육을 위해 책도 읽고 이것저것 프로그램
//                   강의도 들어보지만 늘 미지한 느낌을 벗어날 수 없습니다.
//                   왜냐하면 교사가 무엇을 가르칠지 제대로 모르고 있기 때문입니다.
//                 </p>
//                 <p>
//                   주일학교 교사들은 성경을 가르치도록 부르심을 받은
//                   성경교사들입니다.
//                   <br /> 성경이 손에 주고 있지만 막상 성경을 펼치면 무엇을
//                   가르쳐야 할지 몰라서 어설픈 성경이야기나 막연한 삶의 지혜를
//                   가르치는 교사들도 있습니다.
//                 </p>
//                 <p>
//                   그러기에 “무엇을 어떻게 가르쳐야 하는가?”는 주일학교 교사들의
//                   공통적인 해결과제일 것입니다.
//                   <br /> 아무리 성경이 꿀송이처럼 달고 교훈과 책망과 바르게 함과
//                   의로 교육하기에 유익한 능력이 있다 할지라고 맛을 내는 요리사가
//                   형편없는 사람이라면 성경의 깊은 맛은 제대로 나올 수 없을
//                   것입니다.{" "}
//                 </p>
//                 <p>
//                   꽃동산 아카데미를 통해 교사는 일상생활 속에서도 복음적인 삶의
//                   모범이 무엇이지 배우고 가르치게 될 것입니다.
//                   <br /> 또한 학부모들은 가정생활 속에서 부딪히는 여러 신앙적
//                   애매모호한 요소들을 신앙적으로 해석할 수 있는 능력을 키워줄
//                   것이며, 자녀들과 지속적으로 성경과 교리에 관한 대화를 함으로서
//                   우리의 자녀들과 아이들이 바르게 세상을 헤쳐 나갈 수 있는
//                   지혜와 능력을 키워줄 것입니다.
//                 </p>
//                 <p>
//                   한국교회와 주일학교가 다시 회복하고 부흥 할 수 있는 방법은
//                   오직 성경으로 돌아가는 길밖 에 없습니다. 그런 역할을 꽃동산
//                   아카데미가 훌륭히 수행할 것입니다. 그래서 교사들과 주일학교
//                   아이들이 말씀으로 바로 서 있을 때 한국 주일학교 역사에는 다시
//                   한번 주의 말씀이 흥왕하여 세력을 더하는 짜릿한 부흥의 참
//                   기쁨을 누릴 것입니다.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

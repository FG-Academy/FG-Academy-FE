export const Footer = () => {
  return (
    <footer className="w-full text-gray-600 bg-white border-t border-gray-200">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
          <address className="text-sm not-italic leading-6 text-center sm:text-left">
            <span className="block sm:inline">
              (01703) 서울특별시 노원구 노원로 420 (상계동, 꽃동산교회)
            </span>
            <span className="hidden mx-2 text-gray-300 sm:inline">|</span>
            <span className="block sm:inline">
              Tel.{" "}
              <a
                href="tel:029378334"
                className="font-medium text-gray-700 underline-offset-2 hover:text-gray-900 hover:underline"
              >
                02-937-8334
              </a>
            </span>
            <span className="hidden mx-2 text-gray-300 sm:inline">|</span>
            <span className="block sm:inline">
              <a
                href="mailto:flowergardenchurch@naver.com"
                className="font-medium text-gray-700 underline-offset-2 hover:text-gray-900 hover:underline"
              >
                flowergardenchurch@naver.com
              </a>
            </span>
          </address>

          {/* Optional space for a small logo or quick links in the future */}
        </div>

        <div className="flex flex-col items-center gap-1 mt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">
            Copyright @ 2019 꽃동산교회 All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Provided{" "}
            <span className="font-semibold tracking-wide">gongcheck</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

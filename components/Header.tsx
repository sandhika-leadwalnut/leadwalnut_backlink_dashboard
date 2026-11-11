import { REPORT_CONFIG, IMAGE_PATHS } from "../data/index";

const Header = () => {
  return (
    <header className="bg-white shadow-md border-t-4 border-[#29b554]">
      <div className="container mx-auto px-4 md:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <img
            src={IMAGE_PATHS.leadwalnutLogo}
            alt="LeadWalnut"
            className="h-12 w-auto"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallback !== "1") {
                img.dataset.fallback = "1";
                img.src = IMAGE_PATHS.leadwalnutLogoFallback;
              }
            }}
          />
          <p className="text-sm text-gray-500 font-bold">{REPORT_CONFIG.reportDate}</p>
        </div>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {REPORT_CONFIG.reportTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{REPORT_CONFIG.reportSubtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

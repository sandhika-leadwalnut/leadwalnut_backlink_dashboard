import { PagePerformanceData } from "../data/types";
import { performanceSummary, UI_TEXT } from "../data/index";
import { summaryMonths } from "../data/mockdata";

interface PerformanceSummaryTableProps {
  data: PagePerformanceData[];
}

// LeadWalnut version: the Word doc's per-URL tables give total backlinks per month and
// keyword ranks (no Page Authority), so the table shows backlinks built per page and
// how many of its keywords rank.
const pagePath = (url: string) => url.replace(/^https?:\/\/(www\.)?leadwalnut\.com/, "") || "/";

const PerformanceSummaryTable = (_: PerformanceSummaryTableProps) => {
  const rows = performanceSummary as any[];
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{UI_TEXT.performanceSummary.title}</h2>
      <div className="mb-4 px-4 py-2 bg-gray-100 rounded-md inline-block">
        <p className="text-sm font-semibold text-gray-700">Source: GSC</p>
      </div>
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead className="bg-[#effaf2] border-b-2 border-gray-200">
              <tr>
                <th rowSpan={2} className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-[300px]">URL</th>
                <th colSpan={summaryMonths.length} className="pt-4 px-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Total Backlinks
                </th>
                <th rowSpan={2} className="p-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Keywords Tracked</th>
                <th rowSpan={2} className="p-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Keywords Ranking</th>
              </tr>
              <tr>
                {summaryMonths.map((m) => (
                  <th key={m} className="pb-3 px-4 text-center text-xs font-semibold text-gray-500">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800 max-w-[300px] truncate" title={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-[#219647]">{pagePath(s.url)}</a>
                  </td>
                  {(s.backlinks || []).map((v: number | null, j: number) => (
                    <td key={j} className={`p-4 text-center font-semibold ${j === s.backlinks.length - 1 ? "text-[#219647]" : "text-gray-600"}`}>
                      {v ?? "-"}
                    </td>
                  ))}
                  <td className="p-4 text-center text-gray-700 font-semibold">{s.keywordsTracked}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        s.keywordsRanking > 0 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {s.keywordsRanking} of {s.keywordsTracked}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummaryTable;

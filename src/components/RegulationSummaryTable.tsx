import { comparisonData } from '../data/regulationComparison';

interface Props {
  highlightRegion?: string;
  borderColor?: string;
  headerBg?: string;
}

export function RegulationSummaryTable({ 
  highlightRegion, 
  borderColor = "border-white/10",
  headerBg = "bg-white/10"
}: Props) {
  return (
    <div className={`glass-card ${borderColor} overflow-hidden`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-center border-collapse min-w-[1200px] table-fixed">
          <thead className={headerBg}>
            <tr>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32 sticky left-0 bg-whisky-950/80 backdrop-blur-sm z-20">區域 / 規範</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-48">產品種類</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-64">原料</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32">酶製劑</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-40">發酵微生物</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-64">蒸餾設備與方式</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32">蒸餾酒精度</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32">入桶酒精度</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-24">木桶容量</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-64">木桶種類</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-48">陳年時間</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-40">年份標示</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32">焦糖調色</th>
              <th className="p-4 text-base font-bold uppercase tracking-wider text-white/40 border-b border-white/10 w-32">裝瓶酒精</th>
            </tr>
          </thead>
          <tbody className="bg-white/5">
            {comparisonData.map((row) => {
              const isHighlight = highlightRegion && row.region.includes(highlightRegion);
              return (
                <tr key={row.region} className={`${isHighlight ? 'bg-amber-500/10' : 'hover:bg-white/10'} transition-colors`}>
                  <td className={`p-4 text-base font-bold ${isHighlight ? 'text-amber-400' : 'text-white/90'} border-b border-white/5 sticky left-0 bg-whisky-950/80 backdrop-blur-sm z-10`}>{row.region}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5 whitespace-pre-wrap">{row.category}</td>
                  <td className="p-4 text-sm text-white/60 border-b border-white/5 text-left whitespace-pre-wrap">{row.ingredients}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.enzymes}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.yeast}</td>
                  <td className="p-4 text-sm text-white/60 border-b border-white/5 text-left whitespace-pre-wrap">{row.distillationWay}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.distillationAbv}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5 whitespace-pre-wrap">{row.caskAbv}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.caskSize}</td>
                  <td className="p-4 text-sm text-white/60 border-b border-white/5 text-left whitespace-pre-wrap">{row.caskType}</td>
                  <td className="p-4 text-sm text-white/60 border-b border-white/5 whitespace-pre-wrap">{row.aging}</td>
                  <td className="p-4 text-sm text-white/60 border-b border-white/5 text-left whitespace-pre-wrap">{row.ageStatement}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.caramel}</td>
                  <td className="p-4 text-base text-white/60 border-b border-white/5">{row.bottlingAbv}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

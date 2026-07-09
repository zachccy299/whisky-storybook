import React from 'react';
import { motion } from 'motion/react';
import { Table, ArrowLeft, Download, Info, Check, X, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function RegionComparison() {
  const regions = [
    { name: "蘇格蘭", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", detail: "1. SWR 2009\n2. 技術文件", path: "/regulations/scotch" },
    { name: "愛爾蘭", emoji: "🇮🇪", detail: "1. Irish Whiskey Act 1980\n2. 技術文件 2014", path: "/regulations/irish" },
    { name: "歐盟", emoji: "🇪🇺", detail: "EU 2019/787", path: "/regulations/eu" },
    { name: "日本", emoji: "🇯🇵", detail: "1. 威士忌標示規範\n2. 酒稅法\n3. 酒稅法施行令", path: "/regulations/japanese" },
    { name: "美國", emoji: "🇺🇸", detail: "1. 27 CFR Part 5 &\n2. TTB CH.8", path: "/regulations/bourbon" },
    { name: "田納西", emoji: "🇺🇸", detail: "田納西州法 57-2-106", path: "/regulations/bourbon" },
    { name: "加拿大", emoji: "🇨🇦", detail: "1. C.R.C. c870\n2. SI/2009-61", path: "/regulations/canadian" }
  ];

  const sections = [
    {
      title: "【 生產規範 】",
      rows: [
        {
          label: "威士忌子品項",
          values: [
            "1. 單一麥芽\n2. 調和麥芽\n3. 單一穀物\n4. 調和穀物\n5. 調和威士忌",
            "1. 壺式\n2. 麥芽\n3. 穀物\n4. 調和",
            "威士忌",
            "日本威士忌",
            "波本、玉米、特定穀物名威士忌 (共16大類)",
            "田納西威士忌",
            "1. 加拿大威士忌\n2. 裸麥威士忌\n3. 裸麥麥芽威士忌"
          ]
        },
        {
          label: "原料",
          values: [
            "1. 麥芽威士忌：100% 大麥芽\n2. 穀物威士忌：大麥芽 + 穀物",
            "1. 壺式：≥30% 大麥芽 + ≥30% 大麥\n2. 麥芽：100% 大麥芽\n3. 穀物：≤30% 大麥芽",
            "發芽穀物 + 穀物",
            "發芽穀物 + 穀物",
            "1. 波本：≥51% 玉米\n2. 玉米威士忌：≥80% 玉米\n3. 特定穀物名：≥51% 該穀物\n4. 單一麥芽：100% 大麥芽",
            "玉米 ≥51%",
            "穀物或穀物製品"
          ]
        },
        {
          label: "酶製劑",
          isStatus: true,
          values: [false, true, "－（允許）", "－（允許）", "－（允許）", "－（允許）", true]
        },
        {
          label: "發酵微生物",
          values: [
            "僅酵母",
            "僅酵母",
            "僅酵母",
            "－（允許其他微生物）",
            "－（允許其他微生物）",
            "－（允許其他微生物）",
            "酵母 + 微生物"
          ]
        },
        {
          label: "蒸餾設備與方式",
          values: [
            "1. 麥芽：批次銅壺式 (技術文件規範)\n2. 穀物：無限制",
            "1. 壺式/麥芽：批次銅壺 (技術文件規範第一次需銅製蒸餾器)\n2. 穀物：柱式蒸餾",
            "－（無限制）",
            "－（無限制）",
            "－（無限制）",
            "－（無限制）",
            "－（無限制）"
          ]
        },
        {
          label: "蒸餾精度",
          values: [
            "≤94.8% vol",
            "≤94.8% vol",
            "≤94.8% vol",
            "≤95% vol",
            "1. 威士忌：≤95% vol\n2. 其餘分類：≤80% vol",
            "≤80% vol",
            "－（無限制）"
          ]
        }
      ]
    },
    {
      title: "【 熟成規範 】",
      rows: [
        {
          label: "入桶酒精度",
          values: [
            "－（無限制）",
            "－（無限制）",
            "－（無限制）",
            "－（無限制）",
            "1. 威士忌：無限制\n2. 其餘：≤62.5% vol",
            "≤62.5% vol",
            "－（無限制）"
          ]
        },
        {
          label: "入桶前要求",
          values: [
            "無規定",
            "無規定",
            "無規定",
            "無規定",
            "無規定",
            "1. 林肯郡法：必須經楓木炭過濾\n（Lincoln County Process）\n2. 若立法前未使用楓木炭過濾的，可以繼續不用",
            "無規定"
          ]
        },
        {
          label: "木桶總量",
          values: [
            "≤700L",
            "≤700L",
            "≤700L",
            "≤700L",
            "1. 單一麥芽：≤700L\n2. 其餘：無限制",
            "－（無限制）",
            "≤700L"
          ]
        },
        {
          label: "木桶種類",
          center: true,
          values: [
            "橡木桶",
            "木桶",
            "木桶",
            "木桶",
            "1. 波本：新炙烤橡木桶\n2. 玉米：舊桶或未燒烤木桶\n3. 特定穀物名：無限制\n4. 單一麥芽：橡木桶",
            "新炙烤橡木桶",
            "木桶"
          ]
        },
        {
          label: "陳年時間",
          center: true,
          values: [
            "最少 3 年",
            "最少 3 年",
            "最少 3 年",
            "最少 3 年",
            "1. 無強制要求，但4 年以下需標示酒種名稱、用量和陳年時間；\n2. 「純」(Straight) 需 2 年；\n3. 保稅裝瓶需 4 年；",
            "最少 2 年",
            "調入酒最少 2 年\n（葡萄酒不需要）"
          ]
        }
      ]
    },
    {
      title: "【 標示規範 】",
      rows: [
        {
          label: "年份標示",
          center: true,
          values: [
            "1. 最年輕年份\n2. 單一年份要全單一年度蒸餾",
            "最年輕年份",
            "最年輕年份",
            "無特別說明\n（參照蘇格蘭威士忌）",
            "最年輕年份",
            "最年輕年份",
            "1. 最年輕年份\n2. 若調入烈酒低於 9.09% → 按原始酒齡\n3. 若調入烈酒超過 9.09% → 按最年輕調入酒計算"
          ]
        },
        {
          label: "焦糖調色",
          isStatus: true,
          values: [
            true, 
            true, 
            true, 
            true, 
            "1. 波本：不行\n2. 帶「純」字：不行\n3. 單一麥芽：可，需標示\n4. 其餘：可", 
            false, 
            true
          ]
        },
        {
          label: "最低裝瓶\n酒精度",
          center: true,
          values: [
            "40%vol",
            "40%vol",
            "40%vol",
            "40%vol",
            "1. 保稅裝瓶：50%vol\n2. 其餘：40%vol",
            "40%vol",
            "40%vol"
          ]
        }
      ]
    }
  ];


  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <Link to="/regulations" className="inline-flex items-center gap-2 text-amber-500/60 hover:text-amber-500 transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>返回法規列表</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">傳統威士忌產區法規比較表</h1>
              <p className="text-white/40 max-w-2xl">
                全方位對比全球主要威士忌產區的生產規範、熟成要求及標示準則。點擊產區可查看詳細法規。
              </p>
            </div>
          </div>
        </div>

        {/* Table Container - Optimized vertical scroll height for ~20 rows and smooth bi-directional scroll */}
        <div className="glass-card border-amber-500/20 overflow-hidden">
          <div className="overflow-auto custom-scrollbar max-h-[80vh] overscroll-behavior-contain">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-amber-500/10 sticky top-0 z-40 backdrop-blur-md">
                  <th className="p-6 text-base text-center font-black uppercase tracking-widest text-amber-500 border-b border-white/10 sticky left-0 bg-whisky-950/90 z-50 w-[180px]">
                    類別
                  </th>
                  {regions.map((region, idx) => (
                    <th key={idx} className="p-0 border-b border-white/10 min-w-[180px]">
                      <Link 
                        to={region.path}
                        className="block p-6 text-center hover:bg-amber-500/10 transition-all group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{region.emoji}</div>
                        <div className="font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{region.name}</div>
                        <div className="text-[11px] text-white/30 font-mono whitespace-pre-line leading-tight">
                          {region.detail}
                        </div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/5">
                {sections.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr className="bg-white/5">
                      <td colSpan={regions.length + 1} className="p-4 text-2xl text-center font-bold text-amber-500/50 uppercase tracking-[0.3em] bg-black/40 border-y border-white/5">
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-6 text-base text-center font-bold text-white/80 sticky left-0 bg-whisky-950/90 backdrop-blur-sm z-20 group-hover:text-amber-500 transition-colors">
                          {row.label}
                        </td>
                        {row.values.map((val, vIdx) => {
                          const isUnlimited = typeof val === 'string' && val.includes('－（無限制）');
                          const isMultiLine = typeof val === 'string' && val.includes('\n');
                          
                          // Special cases for multi-line text that should be left-aligned
                          const isSpecialLeftAlign = 
                            isMultiLine || 
                            (row.label === '年份標示' && (vIdx === 0 || vIdx === 3)) || 
                            (row.label === '焦糖調色' && vIdx === 4);
                            
                          const shouldCenter = ((row as any).center || isUnlimited) && !isSpecialLeftAlign;

                          return (
                            <td key={vIdx} className={cn(
                              "p-6 text-base text-white/60 leading-relaxed border-l border-white/5",
                              shouldCenter && "text-center"
                            )}>
                              {(row as any).isStatus ? (
                                <div className={cn("flex", shouldCenter ? "justify-center" : "justify-start text-left")}>
                                  {val === true ? (
                                    <div className="flex items-center gap-1.5 text-green-500 font-bold">
                                      <Check className="w-4 h-4" />
                                      <span>允許</span>
                                    </div>
                                  ) : val === false ? (
                                    <div className="flex items-center gap-1.5 text-red-500 font-bold text-center">
                                      <X className="w-4 h-4" />
                                      <span>不允許</span>
                                    </div>
                                  ) : (
                                    <div className={cn("whitespace-pre-line", shouldCenter ? "text-center" : "text-left")}>{val}</div>
                                  )}
                                </div>
                              ) : (
                                <div className="whitespace-pre-line">
                                  {val}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-center gap-8 text-[11px] text-white/20 uppercase tracking-widest font-bold font-mono">
          <div className="flex items-center gap-2">
            <Info className="w-3 h-3" />
            <span>最後更新於 2026 年 5 月</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span>根據各產區官方技術文件彙整</span>
        </div>
      </div>
    </div>
  );
}

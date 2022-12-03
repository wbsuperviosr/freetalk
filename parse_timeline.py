# %%
import pandas as pd
import json

xlsx = pd.ExcelFile("timeline1.xlsx")

data = {}
for sheet_name in xlsx.sheet_names:
    data[sheet_name] = xlsx.parse(sheet_name)
xlsx.close()


# %%
def parse_timestamp(ts):
    return f"{ts.year}年{ts.month}月{ts.day}日"


sheet_names = ["② 案发当日篇", "③ 归案X构陷篇"]

obj = []
for sheet_name in sheet_names:
    payload = {}
    payload['category'] = sheet_name
    payload['details'] = []
    for _, group in data[sheet_name].groupby("日期"):
        date = group.iloc[0]['日期']
        dat = {}
        dat['date'] = parse_timestamp(date) if isinstance(
            date, pd.Timestamp) else date
        dat['events'] = []
        idx_sum = 0
        for i, (idx, row) in enumerate(group.iterrows()):
            event = {
                'time': "" if pd.isna(row['时间']) else row['时间'],
                'event': row['事件'],
                'people': row['人物'].split("|")
            }
            dat['events'].append(event)
            idx_sum += idx
        dat['order'] = idx_sum / (i + 1)
        payload['details'].append(dat)
    payload['details'] = sorted(payload['details'],
                                key=lambda item: item['order'])
    obj.append(payload)

json.dump(obj,
          open("timeline.json", mode='w', encoding="utf8"),
          ensure_ascii=False)

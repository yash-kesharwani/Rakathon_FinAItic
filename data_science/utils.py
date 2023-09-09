import re
import pandas as pd
import calendar
from datetime import datetime


def process_data(df):

    text = []
    # df = pd.read_csv("~/Desktop/Rakathon/rakathon_dataset.csv")
    # df["txdate"] = df["txdate"].apply(lambda x: datetime.strptime(x, "%d/%m/%Y"))
    df.sort_values(by=["txdate"], inplace=True)
    df.reset_index(inplace=True, drop=True)
    df["month"] = df["txdate"].apply(lambda x: x.month)
    df["week"] = df["txdate"].apply(lambda x: str(x.month) + "_" + str((x.day // 7) + 1))
    months_list = df.month.unique().tolist()
    week_wise = df.groupby(["week", "category"]).agg({"withdrawal": ["min", "max", "mean", "sum"], "balance": "max"})
    week_wise = week_wise.reset_index(drop=False)
    week_wise = week_wise[~week_wise["category"].isin(["SALARY", "INTEREST"])]
    week_wise.columns = ["week", "category", "wmin", "wmax", "wmean", "wsum", "bmax"]

    category_list = df.category.unique().tolist()
    category_wise_spends = df.groupby(by=["month", "category"]).agg({"withdrawal": "sum"})
    category_wise_spends.reset_index(inplace=True)
    category_wise_spends.sort_values(["month", "withdrawal"], inplace=True, ascending=[1, 0])
    category_wise_spends.reset_index(inplace=True, drop=True)

    cat_wise_gains = df.groupby(by=["month", "category"]).agg({"deposit": "sum"})
    cat_wise_gains.reset_index(inplace=True)
    cat_wise_gains = cat_wise_gains[cat_wise_gains.deposit > 0]
    cat_wise_gains.reset_index(inplace=True, drop=True)
    cat_wise_gains = cat_wise_gains.groupby(by=["month"]).agg({"deposit": "sum"})
    cat_wise_gains.reset_index(inplace=True)

    category_wise_spends = category_wise_spends.merge(cat_wise_gains)
    category_wise_spends["affinity"] = (category_wise_spends["withdrawal"] / category_wise_spends["deposit"]) * 100
    overall_spend_trend = []
    for cat in category_list:
        spend_trend = []
        for i in range(len(category_wise_spends)):
            if category_wise_spends.loc[i, "category"] == cat:
                spend_trend.append({"category": cat,
                                    "month": category_wise_spends.loc[i, "month"],
                                    "withdrawal": category_wise_spends.loc[i, "withdrawal"],
                                    "affinity": category_wise_spends.loc[i, "affinity"]
                                    })
        overall_spend_trend.append(spend_trend)

    final_trend = []
    for spend_trend in overall_spend_trend:
        item = spend_trend
        counter = 0
        category = item[0]["category"]
        spend_trend = []
        for month in sorted(months_list):
            if counter < len(item) and month < item[counter]["month"]:
                spend_trend.append({"category": category,
                                    "month": month,
                                    "withdrawal": 0,
                                    "affinity": 0.0})
                month += 1
                continue

            if counter < len(item):
                spend_trend.append(item[counter])
            else:
                spend_trend.append({"category": category,
                                    "month": month,
                                    "withdrawal": 0,
                                    "affinity": 0.0})
            counter += 1
        final_trend.append(spend_trend)

    for item in final_trend:
        cur = item[0]["withdrawal"]
        cur_month = item[0]["month"]
        category = item[0]["category"]
        affinity = item[0]["affinity"]

        if category in ["SALARY", "INTEREST"]:
            continue

        text.append("I have spent {}% amount of my monthly income on category {}".format(affinity, category))
        text.append(
            "I have spent amount {} on category {} in month {}".format(cur, category, calendar.month_name[cur_month]))

        for i in range(1, len(item)):
            prev = cur
            cur = item[i]["withdrawal"]

            prev_month = cur_month
            cur_month = item[i]["month"]
            affinity = item[0]["affinity"]

            text.append("I have spent {}% amount of my monthly income on category {}".format(affinity, category))
            if cur == 0:
                text.append("I have not spent any amount on category {} in month {}".format(category,
                                                                                            calendar.month_name[
                                                                                                cur_month]))
            else:
                text.append("I have spent amount {} on category {} in month {}".format(cur, category,
                                                                                       calendar.month_name[cur_month]))

            if prev == 0:
                text.append("""This month I have spent {} amount is spent in {} on {} 
                            where as last month I did not make any transaction in this category {}""".format(cur,
                                                                                                             category,
                                                                                                             calendar.month_name[
                                                                                                                                             cur_month],
                                                                                                             category))
                continue

            ratio = cur / prev

            if ratio < 0.25:
                text.append("There is a significant drop in my expenses for {} from {} to {}.".format(category,
                                                                                                      calendar.month_name[
                                                                                                          prev_month],
                                                                                                      calendar.month_name[
                                                                                                          cur_month]))
                text.append("Ratio of drop is {}.".format(ratio))
            elif 0.25 <= ratio < 1:
                text.append("There is a slight drop in my expenses for {} from {} to {}.".format(category,
                                                                                                 calendar.month_name[
                                                                                                     prev_month],
                                                                                                 calendar.month_name[
                                                                                                     cur_month]))
                text.append("Ratio of drop is {}.".format(ratio))
            elif 1 <= ratio < 2.5:
                text.append("There is a tiny increase in my expenses for {} from {} to {}.".format(category,
                                                                                                   calendar.month_name[
                                                                                                       prev_month],
                                                                                                   calendar.month_name[
                                                                                                       cur_month]))
                text.append("Ratio of increase is {}.".format(ratio))
            elif ratio > 2.5:
                text.append("There is a significant of increase in my expenses for {} from {} to {}.".format(category,
                                                                                                             calendar.month_name[
                                                                                                                 prev_month],
                                                                                                             calendar.month_name[
                                                                                                                 cur_month]))
                text.append("Ratio of increase is {}.".format(ratio))

        text.append("\n")

    category_affinity = category_wise_spends.groupby(by=["category"]).agg({"affinity": "sum"})
    category_affinity.reset_index(inplace=True)
    category_affinity["affinity"] = category_affinity["affinity"] / len(months_list)
    category_affinity = category_affinity.sort_values(["affinity"], ascending=0)
    category_affinity = category_affinity[~category_affinity["category"].isin(["SALARY", "INTEREST"])]
    category_affinity.reset_index(inplace=True, drop=True)

    for i in range(len(category_affinity)):
        if i == 0:
            text.append("Most of money is spent in category {} which is {}".format(category_affinity.loc[i, "category"],
                                                                                   category_affinity.loc[
                                                                                       i, "affinity"]))
        elif i < len(category_affinity) - 1:
            text.append("My likeliness of expenditure towards category {} is {}%".format(
                category_affinity.loc[i, "category"], category_affinity.loc[i, "affinity"]))
        else:
            text.append(
                "Lowest expenses are done in category {} which is {}".format(category_affinity.loc[i, "category"],
                                                                             category_affinity.loc[i, "affinity"]))

    per_day_bal = df.groupby(["txdate"]).agg({"balance": "max"})
    per_day_bal.reset_index(inplace=True)
    for i in range(len(per_day_bal)):
        text.append(
            "I have balance {} on day {}.\n".format(per_day_bal.loc[i, "txdate"], per_day_bal.loc[i, "balance"]))

    for i in range(len(df)):
        if df.loc[i, "category"] == "SALARY":
            text.append("I got my salary of amount {} on {} for month {}.".format(df.loc[i, "month"],
                                                                                  df.loc[i, "txdate"],
                                                                                  calendar.month_name[
                                                                                      df.loc[i, "month"]]))

        if df.loc[i, "category"] == "EMI":
            text.append("I paid EMI {} on for month {}.".format(df.loc[i, "month"],
                                                                df.loc[i, "txdate"],
                                                                calendar.month_name[df.loc[i, "month"]]))
            emi_check = re.findall(r"([0-9]+/[0-9]+)", df.loc[i, "details"])
            if isinstance(emi_check, list) and len(emi_check) > 0:
                values = re.findall("([0-9]+/[0-9]+)", df.loc[i, "details"])[0].split("/")
                emis_left = int(values[1]) - int(values[0])
                text.append("Now {} EMIs are left for transaction {} from month {} onwards.".format(emis_left,
                                                                                                    df.loc[
                                                                                                        i, "details"],
                                                                                                    calendar.month_name[
                                                                                                        df.loc[
                                                                                                            i, "month"]]))

    with open("input.txt", "w") as file:
        for line in text:
            file.write(line)






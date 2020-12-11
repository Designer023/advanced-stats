// eslint-disable-next-line import/prefer-default-export
import { call, put, select, takeEvery } from "redux-saga/effects";
import moment from "moment";
import range from "lodash/range";

import eddingtonValue from "../../../utils/eddington";

const processEddington = (activities, activityTypes) => {
    const data = {};
    activityTypes.forEach((type) => {
        const filteredActivity = activities.filter((activity) => activity.type === type);

        const eddingtonNumbers = [0];

        const eddingtonYearNumbers = {};

        filteredActivity.forEach((fActivity) => {
            const year = moment(fActivity.start_date).year();

            if (typeof eddingtonYearNumbers[year] === "undefined") {
                eddingtonYearNumbers[year] = {
                    breakdown: [0],
                    score: 0
                };
            }

            const { distance } = fActivity;
            const d = Math.floor(distance / 1000);

            for (let i = 1; i <= d; i += 1) {
                // All time
                if (typeof eddingtonNumbers[i] === "undefined") {
                    eddingtonNumbers[i] = 1;
                } else {
                    eddingtonNumbers[i] += 1;
                }
                // by the year
                if (typeof eddingtonYearNumbers[year].breakdown[i] === "undefined") {
                    eddingtonYearNumbers[year].breakdown[i] = 1;
                } else {
                    eddingtonYearNumbers[year].breakdown[i] += 1;
                }
            }
        });
        const score = eddingtonValue(eddingtonNumbers);

        Object.keys(eddingtonYearNumbers).forEach((y) => {
            const { breakdown } = eddingtonYearNumbers[y];
            eddingtonYearNumbers[y].score = eddingtonValue(breakdown);
        });
        data[type.toLowerCase()] = {
            breakdown: eddingtonNumbers,
            overall: score,
            years: eddingtonYearNumbers
        };
    });

    return data;
};

const processActivities = (activities, activityTypes) => {
    const data = {};
    activityTypes
        .sort((a, b) => a.upload_id - b.upload_id)
        .forEach((type) => {
            const filteredActivity = activities.filter((activity) => activity.type === type);

            const activityByYearsNew = {};

            // 1. Create all days in years
            // Find years used by activities
            const usedYears = filteredActivity.reduce((a, c) => {
                const y = moment(c.start_date).year();
                if (!a.includes(y)) a.push(y);
                return a;
            }, []);

            // Generate all days with default information
            usedYears.forEach((year) => {
                /**
                 * Create days for a year
                 * @type {number}
                 */
                const thisYearDays = moment().year(year).endOf("year").dayOfYear(); // 1 -36(5|6)
                const dayNumsToUse = range(1, thisYearDays + 1); // Range is upto, not inclusive
                activityByYearsNew[year] = {
                    year,
                    days: [
                        ...dayNumsToUse.map((day) => ({
                            day,
                            date: moment().year(year).dayOfYear(Number(day)).startOf("day").format(),
                            activities: [],
                            total: null,
                            yearCumulative: null,
                            totalCumulative: null,
                            remainingYearTarget: null,
                            requiredPerDay: null,
                            targetValue: 3000 * 1000 // Todo: get from state/settings
                        }))
                    ],
                    total: null
                };
            });

            // append all activities to days

            filteredActivity.forEach((fActivity) => {
                const actDate = moment(fActivity.start_date);
                const yearOfAct = actDate.year();
                const dayOfActInYear = actDate.dayOfYear();

                activityByYearsNew[yearOfAct].days[dayOfActInYear - 1].activities.push(fActivity);
            });
            // Math the results

            let tc = 0;

            Object.keys(activityByYearsNew).forEach((yearNum) => {
                const { days } = activityByYearsNew[yearNum];
                let yc = 0;

                days.forEach((currentDay, i) => {
                    // const currentDay = activityByYearsNew[yearNum].days[day - 1];
                    // eslint-disable-next-line no-unused-vars
                    const target = currentDay.targetValue;
                    const remaining = target - yc; // before we add the day taregt so it's eq midnight
                    const requiredPerDay = remaining / (days.length - i); // This is the amount needed today (and all days after at this level)
                    const dayC = currentDay.activities.length ? currentDay.activities.reduce((a, c) => a + c.distance, 0) : 0;
                    tc += dayC;
                    yc += dayC;

                    // Update day:
                    activityByYearsNew[yearNum].days[currentDay.day - 1] = {
                        ...currentDay,
                        total: dayC,
                        yearCumulative: yc,
                        totalCumulative: tc,
                        remainingYearTarget: remaining - dayC, // Remove anything ran for today
                        requiredPerDay
                    };
                });

                activityByYearsNew[yearNum].total = yc;
            });

            // console.log(activityByYearsNew);
            //
            // const activitiesByYear = {};
            //
            // let yearCumulative = 0;
            // let totalCumulative = 0;
            // let currentYear = null;
            //
            // const target = 3000 * 1000; // todo get from state / settings
            //
            // let runningTotalDistance = 0;
            // filteredActivity.forEach((fActivity) => {
            //     const year = moment(fActivity.start_date).year();
            //
            //     if (!currentYear || currentYear !== year) {
            //         currentYear = year;
            //         yearCumulative = 0;
            //     }
            //
            //     const daysInYear = moment(fActivity.start_date).endOf("year").dayOfYear();
            //     // check if year exists,
            //     const date = moment(fActivity.start_date);
            //
            //     // Cumulative
            //     yearCumulative += fActivity.distance;
            //     totalCumulative += fActivity.distance;
            //     const remainingYearTarget = target - yearCumulative;
            //     const requiredPerDay = remainingYearTarget / (daysInYear - date.dayOfYear() + 1);
            //
            //     if (typeof activitiesByYear[year] === "undefined") {
            //         const days = range(1, daysInYear + 1);
            //         activitiesByYear[year] = {
            //             year,
            //             total: 0,
            //             days: [
            //                 ...days.map((day) => ({
            //                     day,
            //                     date: moment().year(year).dayOfYear(Number(day)).startOf("day").format(),
            //                     activities: [],
            //                     total: 0,
            //                     yearCumulative,
            //                     totalCumulative,
            //                     remainingYearTarget,
            //                     requiredPerDay
            //                 }))
            //             ]
            //         };
            //     }
            //
            //     const dayOYIndex = date.dayOfYear() - 1; // 1- 366 so shift by 1 for 0 based!
            //     activitiesByYear[year].days[dayOYIndex].activities.push(fActivity);
            //
            //     runningTotalDistance += fActivity.distance;
            //
            //     // Today
            //     activitiesByYear[year].days[dayOYIndex].total += fActivity.distance;
            //     // Year
            //     activitiesByYear[year].total += fActivity.distance;
            //
            //     // Cumulative
            //     activitiesByYear[year].days[dayOYIndex].yearCumulative = yearCumulative;
            //     activitiesByYear[year].days[dayOYIndex].totalCumulative = totalCumulative;
            //
            //     // Recalcualte for the day
            //     const reRemainingYearTarget = target - yearCumulative;
            //     const reRequiredPerDay = remainingYearTarget / (daysInYear - date.dayOfYear() + 1);
            //
            //     activitiesByYear[year].days[dayOYIndex].remainingYearTarget = reRemainingYearTarget;
            //     activitiesByYear[year].days[dayOYIndex].requiredPerDay = reRequiredPerDay;
            // });

            data[type.toLowerCase()] = {
                years: activityByYearsNew,
                total: tc
            };
        });

    return data;
};

const processData = (activities) => {
    const activityTypes = ["Run", "Ride"];
    const eddingtonData = processEddington(activities, activityTypes);
    const activityData = processActivities(activities, activityTypes);
    return {
        eddington: eddingtonData,
        activities: activityData
    };
};

const getAllActivities = (state) => {
    return state.athlete.activities;
};

function* updateAthleteActivity() {
    yield put({ type: "PROCESSING_DATA_START" });
    yield put({ type: "LOADING_START" });
    yield put({ type: "SET_LOADING_MESSAGE", payload: `Processing data...` });

    const activities = yield select(getAllActivities);

    const data = yield call(processData, activities);

    yield put({ type: "PROCESSING_DATA_END", payload: data });
    yield put({ type: "RESET_LOADING_MESSAGE" });
    yield put({ type: "LOADING_END" });
}
// eslint-disable-next-line import/prefer-default-export
export function* watchProcessDataAsync() {
    yield takeEvery("LOADING_ACTIVITIES_END", updateAthleteActivity);
}
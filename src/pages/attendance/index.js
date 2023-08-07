import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { clockIn, clockOut, attendanceList } from "../../store/slices/attendance/slices"
import RenderAttendanceListCard from "../../components/attendance"
import { useEffect } from "react"
import Pagination from "../../components/pagination"

function AttendancePage () {

    const { attendance, history, currentPage, totalPage } = useSelector(state => {
        return {
            attendance : state.attendance.list,
            history : state.attendance.history,
            currentPage : state.attendance.currentPage ,
            totalPage : state.attendance.totalPage
        }
    })

    const dispatch = useDispatch()

    const onButtonClockIn = () =>{
        dispatch(
            clockIn({
                date : moment().format("YYYY-MM-DD"),
                clock_in:moment().format("HH:mm:ss")
            })
        )
        dispatch(
            attendanceList({
                page : 1
            })
        )
    }

    const onButtonClockOut = () =>{
        dispatch(
            clockOut({
                date : moment().format("YYYY-MM-DD"),
                clock_out:moment().format("HH:mm:ss")
            })
        )
        dispatch(
            attendanceList({
                page : 1
            })
        )
    }

    const onChangePagination = (type) => {
        dispatch(
            attendanceList({
                page:type === "prev" ? Number(currentPage) - 1 : Number(currentPage) + 1
            })
        )
    }

    useEffect(()=>{
        dispatch(
            attendanceList({
                date:moment().format("YYYY-MM-DD")
            })
        )
        dispatch(
            attendanceList({
                page : 1
            })
        )
    },[])
    
    function clock() {
        const span = document.getElementById('span')||{};

        let date = moment(); 
        let hh = date.hour();
        let mm = date.minutes();
        let ss = date.seconds();

        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;

        let time = hh + ":" + mm + ":" + ss + " " ;

        span.innerText = time;

        return (
            <div className="flex flex-col items-center">
                <a className="text-[20pt]"> {moment().format("MMM, DD Y")}</a>
                <span className="text-[15pt]" id="span" >{time}</span>
            </div>
        )
    }
    setInterval(clock, 1000);

    
    return (
        <div>
            <div className="flex flex-col items-center">
                <div class="my-10 mr-20 w-[30%] py-5 shadow-md sm:rounded-lg">
                    <div className="flex flex-col items-center">
                        {clock()}
                        <div className="flex gap-10 pt-5">
                            <button onClick={onButtonClockIn} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Clock In
                            </button>
                            <button onClick={onButtonClockOut} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Clock Out
                            </button>
                        </div>

                    </div>
                </div>
            </div>
           <div class="my-10 mr-20 w-[95%] shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Clock In
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Clock Out
                            </th>
                        </tr>
                    </thead>
                    <RenderAttendanceListCard attendance={attendance} />
                </table>
            </div>
            <div class="my-10 mr-20 w-[95%] py-5 shadow-md sm:rounded-lg">
                <a className="text-[20pt] pl-5 "> | Attendance History</a>
                <table class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Clock In
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Clock Out
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Salary Per Day
                            </th>
                        </tr>
                    </thead>
                    <RenderAttendanceListCard attendance={history} />
                </table>
            </div>
            <div className="w-[95%] flex flex-col items-center pb-10">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={Number(currentPage) === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>
        </div>
    )
}



export default AttendancePage
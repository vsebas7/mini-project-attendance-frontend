import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { attendanceList } from "../../store/slices/attendance/slices"
import { useEffect, useState } from "react"
import RenderAttendanceListCard from "../../components/attendance"
import Pagination from "../../components/pagination"
import { deduction, payroll } from "../../store/slices/payroll/slices"

function PayrollPage () {

    const { id, payrollMonth, history, deductionList, currentPage, totalPage } = useSelector(state => {
        return {
            id : state.auth.id,
            payrollMonth : state.payroll.list[0],
            deductionList : state.payroll.deduction[0],
            history : state.attendance.history,
            currentPage : state.attendance.currentPage ,
            totalPage : state.attendance.totalPage
        }
    })

    const dispatch = useDispatch()

    const onChangePagination = (type) => {
        dispatch(
            attendanceList({
                startDate : moment().startOf(filter).format("YYYY-MM-DD"), 
                endDate : moment().endOf(filter).format("YYYY-MM-DD"), 
                page:type === "prev" ? Number(currentPage) - 1 : Number(currentPage) + 1
            })
        )
    }
    
    const [filter,setFilter] =useState("month")

    const handleOnChange = event =>{
        setFilter(event.target.value)
        dispatch(
            payroll({ 
                startDate : moment().startOf(event.target.value).format("YYYY-MM-DD"), 
                endDate : moment().endOf(event.target.value).format("YYYY-MM-DD"), 
                employeeId : id
            })
        )
        dispatch(
            attendanceList({
                startDate : moment().startOf(event.target.value).format("YYYY-MM-DD"), 
                endDate : moment().endOf(event.target.value).format("YYYY-MM-DD"), 
                page : 1
            })
        )
        dispatch(
            deduction({
                startDate : moment().startOf(event.target.value).format("YYYY-MM-DD"), 
                endDate : moment().endOf(event.target.value).format("YYYY-MM-DD"), 
                employeeId : id
            })
        )
    }

    useEffect(()=>{
        dispatch(
            payroll({ 
                startDate : moment().startOf('month').format("YYYY-MM-DD"), 
                endDate : moment().endOf('month').format("YYYY-MM-DD"), 
                employeeId : id
            })
        )
        dispatch(
            attendanceList({
                startDate : moment().startOf('month').format("YYYY-MM-DD"), 
                endDate : moment().endOf('month').format("YYYY-MM-DD"), 
                page : 1
            })
        )
        dispatch(
            deduction({
                startDate : moment().startOf('month').format("YYYY-MM-DD"), 
                endDate : moment().endOf('month').format("YYYY-MM-DD"), 
                employeeId : id
            })
        )
    },[])
    
    return (
        <div>
           <div class="my-10 mr-20 w-[80%] py-5 shadow-md sm:rounded-lg">
                <a className="text-[20pt] pl-5  "> | Payroll</a>

                <div class="flex items-center ml-9 gap-3 mt-[15px] " >
                    <input checked={filter === "month"} onChange={handleOnChange} id="default-radio-1" type="radio" value="month" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </input>
                    <label for="default-radio-1" class="text-sm font-medium text-gray-900 dark:text-gray-300">This Month</label>
                
                    <input checked={filter === "year"} onChange={handleOnChange} id="default-radio-2" type="radio" value="year" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </input>
                    <label for="default-radio-2" class="text-sm font-medium text-gray-900 dark:text-gray-300">This Year</label>
                </div>
                
                <div className="flex gap-10">
                    <div>
                        <h5 class="my-5 pl-9 text-xl font-medium text-gray-900 dark:text-white">Total Salary : {payrollMonth?.amount ? new Intl.NumberFormat().format(payrollMonth?.amount) : 0}</h5>
                        <h5 class="my-5 pl-9 text-xl font-medium text-gray-900 dark:text-white">Total Deduction : {new Intl.NumberFormat().format(deductionList?.amount ? deductionList?.amount : 0)}</h5>
                    </div>

                    <div>
                        <h5 class="my-5 pl-9 text-xl font-medium text-gray-900 dark:text-white">Total Attendance Day(s) : {payrollMonth?.attendances_day ? new Intl.NumberFormat().format(payrollMonth?.attendances_day) : 0}</h5>
                        <h5 class="my-5 pl-9 text-xl font-medium text-gray-900 dark:text-white">Total Deduction Day(s) : {new Intl.NumberFormat().format(deductionList?.deduction_day ? deductionList?.deduction_day : 0)}</h5>
                    </div>
                </div>

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
                                Salary
                            </th>
                        </tr>
                    </thead>
                    <RenderAttendanceListCard attendance={history} />
                </table>
            </div>
            <div className="w-[80%] flex flex-col items-center pb-10">
                <Pagination 
                    onChangePagination={onChangePagination}
                    disabledPrev={Number(currentPage) === 1}
                    disabledNext={currentPage >= totalPage}
                />
            </div>
        </div>
    )
}



export default PayrollPage
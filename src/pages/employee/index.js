import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Pagination from "../../components/pagination"
import { employeeList } from "../../store/slices/employee/slices"
import { payroll } from "../../store/slices/payroll/slices"
import moment from "moment"
import RenderEmployeeListCard from "../../components/employee"

function EmployeePage () {

    const { listEmployee, currentPage, totalPage } = useSelector(state => {
        return {
            listEmployee : state.employee.list,
            currentPage : state.employee.currentPage ,
            totalPage : state.employee.totalPage
        }
    })

    const dispatch = useDispatch()

    const onChangePagination = (type) => {
        dispatch(
            employeeList({
                page:type === "prev" ? Number(currentPage) - 1 : Number(currentPage) + 1
            })
        )
    }

    useEffect(()=>{
        dispatch(
            employeeList()
        )
        dispatch(
            payroll({
                startDate : moment().startOf('month').format("YYYY-MM-DD"), 
                endDate : moment().endOf('month').format("YYYY-MM-DD"), 
            })
        )
    },[])

    
    return (
        <div>
            <div class="my-10 mr-20 w-[95%] py-5 shadow-md sm:rounded-lg">
                <a className="text-[20pt] pl-5 "> | Employee List</a>
                <table class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                D.O.B
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Shift Start
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Shift End
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Base Salary
                            </th>
                        </tr>
                    </thead>
                        <RenderEmployeeListCard employee={listEmployee} />
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



export default EmployeePage